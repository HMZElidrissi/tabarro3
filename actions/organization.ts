'use server';

import { z } from 'zod';
import { validatedActionWithUser } from '@/auth/middleware';
import { Role } from '@/types/enums';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const updateOrganizationRoleSchema = z.object({
    userId: z.string().uuid(),
    role: z.enum([Role.ADMIN, Role.ORGANIZATION]),
});

const removeOrganizationSchema = z.object({
    userId: z.string().uuid(),
});

export const getOrganizations = validatedActionWithUser(
    z.object({}),
    async (_, __, user) => {
        if (user.role !== Role.ADMIN) {
            return { error: 'Not authorized' };
        }

        const organizations = await prisma.user.findMany({
            where: {
                deletedAt: null,
                role: Role.ORGANIZATION,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return { organizations };
    },
);

export const getPendingInvitations = validatedActionWithUser(
    z.object({}),
    async (_, __, user) => {
        if (user.role !== Role.ADMIN) {
            return { error: 'Not authorized' };
        }

        const invitations = await prisma.invitation.findMany({
            where: {
                status: 'pending',
                expiresAt: {
                    gt: new Date(),
                },
            },
            include: {
                inviter: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                invitedAt: 'desc',
            },
        });

        return { invitations };
    },
);

export const updateOrganizationRole = validatedActionWithUser(
    updateOrganizationRoleSchema,
    async (data, _, user) => {
        if (user.role !== Role.ADMIN) {
            return { error: 'Not authorized' };
        }

        const { userId, role } = data;

        // Prevent admin from changing their own role
        if (userId === user.id) {
            return { error: 'Cannot change your own role' };
        }

        await prisma.user.update({
            where: { id: userId },
            data: { role },
        });

        revalidatePath('/dashboard/organizations');
        return { success: 'Role updated successfully' };
    },
);

export const removeOrganization = validatedActionWithUser(
    removeOrganizationSchema,
    async (data, _, user) => {
        if (user.role !== Role.ADMIN) {
            return { error: 'Not authorized' };
        }

        const { userId } = data;

        // Prevent admin from removing themselves
        if (userId === user.id) {
            return { error: 'Cannot remove yourself' };
        }

        // Soft delete the user
        await prisma.user.update({
            where: { id: userId },
            data: {
                deletedAt: new Date(),
                email: `${user.email}-${user.id}-deleted`, // Ensure email uniqueness
            },
        });

        revalidatePath('/dashboard/organizations');
        return { success: 'Organization removed successfully' };
    },
);
