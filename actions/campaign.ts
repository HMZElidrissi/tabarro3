'use server';

import { prisma } from '@/lib/prisma';
import { validatedActionWithUser } from '@/auth/middleware';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Role } from '@/types/enums';
import { queueCampaignNotification } from '@/jobs/helpers';

const CampaignSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    organizationId: z.string(),
    cityId: z.coerce.number(),
    location: z.string().min(1),
    startTime: z.string().transform(str => new Date(str)),
    endTime: z.string().transform(str => new Date(str)),
});

interface GetCampaignsParams {
    page: number;
    pageSize: number;
    search?: string;
    organizationId?: string;
    status?: 'upcoming' | 'ongoing' | 'completed';
}

export async function getCampaigns({
    page,
    pageSize,
    search = '',
    organizationId,
    status,
}: GetCampaignsParams) {
    const now = new Date();

    const where = {
        AND: [
            search
                ? {
                      OR: [
                          {
                              name: {
                                  contains: search,
                                  mode: 'insensitive' as const,
                              },
                          },
                          {
                              description: {
                                  contains: search,
                                  mode: 'insensitive' as const,
                              },
                          },
                          {
                              city: {
                                  name: {
                                      contains: search,
                                      mode: 'insensitive' as const,
                                  },
                              },
                          },
                      ],
                  }
                : {},
            organizationId ? { organizationId } : {},
            status === 'upcoming'
                ? { startTime: { gt: now } }
                : status === 'ongoing'
                  ? {
                        AND: [
                            { startTime: { lte: now } },
                            { endTime: { gt: now } },
                        ],
                    }
                  : status === 'completed'
                    ? { endTime: { lt: now } }
                    : {},
        ],
    };

    const [campaigns, totalCount] = await Promise.all([
        prisma.campaign.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { startTime: 'desc' },
            include: {
                organization: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                city: {
                    select: {
                        id: true,
                        name: true,
                        regionId: true,
                    },
                },
                participants: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        }),
        prisma.campaign.count({ where }),
    ]);

    return { campaigns, totalCount };
}

export const getCampaign = async (id: number) => {
    const campaign = await prisma.campaign.findUnique({
        where: { id },
        include: {
            organization: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            city: {
                select: {
                    id: true,
                    name: true,
                    regionId: true,
                },
            },
            participants: {
                select: {
                    id: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                            bloodGroup: true,
                        },
                    },
                },
            },
        },
    });

    if (!campaign) {
        return null;
    }

    return campaign;
};

export const createCampaign = validatedActionWithUser(
    CampaignSchema,
    async (data, _, user) => {
        if (user.role !== Role.ADMIN && user.role !== Role.ORGANIZATION) {
            return { error: 'Not authorized' };
        }

        try {
            // If organization user, use their ID
            const organizationId =
                user.role === Role.ORGANIZATION ? user.id : data.organizationId;

            // Validate dates
            if (new Date(data.startTime) >= new Date(data.endTime)) {
                return { error: 'End time must be after start time' };
            }

            const newCampaign = await prisma.campaign.create({
                data: {
                    ...data,
                    organizationId,
                },
            });

            await queueCampaignNotification(newCampaign.id);

            revalidatePath('/dashboard/campaigns');
            return { success: 'Campaign created successfully' };
        } catch (error) {
            return {
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to create campaign',
            };
        }
    },
);

export const updateCampaign = validatedActionWithUser(
    CampaignSchema.extend({ id: z.coerce.number() }),
    async (data, _, user) => {
        if (user.role !== Role.ADMIN && user.role !== Role.ORGANIZATION) {
            return { error: 'Not authorized' };
        }

        try {
            const campaign = await prisma.campaign.findUnique({
                where: { id: data.id },
            });

            if (!campaign) {
                return { error: 'Campaign not found' };
            }

            // Check if organization user is updating their own campaign
            if (
                user.role === Role.ORGANIZATION &&
                campaign.organizationId !== user.id
            ) {
                return { error: 'Not authorized to update this campaign' };
            }

            // Validate dates
            if (new Date(data.startTime) >= new Date(data.endTime)) {
                return { error: 'End time must be after start time' };
            }

            const { id, ...updateData } = data;

            await prisma.campaign.update({
                where: { id },
                data: updateData,
            });

            revalidatePath('/dashboard/campaigns');
            return { success: 'Campaign updated successfully' };
        } catch (error) {
            return {
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to update campaign',
            };
        }
    },
);

export const deleteCampaign = validatedActionWithUser(
    z.object({ id: z.coerce.number() }),
    async (data, _, user) => {
        if (user.role !== Role.ADMIN && user.role !== Role.ORGANIZATION) {
            return { error: 'Not authorized' };
        }

        try {
            const campaign = await prisma.campaign.findUnique({
                where: { id: data.id },
            });

            if (!campaign) {
                return { error: 'Campaign not found' };
            }

            // Check if organization user is deleting their own campaign
            if (
                user.role === Role.ORGANIZATION &&
                campaign.organizationId !== user.id
            ) {
                return { error: 'Not authorized to delete this campaign' };
            }

            // Check if campaign has started
            if (
                new Date(campaign.startTime) <= new Date() &&
                user.role !== Role.ADMIN
            ) {
                return {
                    error: 'Cannot delete a campaign that has already started',
                };
            }

            await prisma.campaign.delete({
                where: { id: data.id },
            });

            revalidatePath('/dashboard/campaigns');
            return { success: 'Campaign deleted successfully' };
        } catch (error) {
            return {
                error: 'Failed to delete campaign',
            };
        }
    },
);
