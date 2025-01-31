'use server';

import { prisma } from '@/lib/prisma';
import { validatedActionWithUser } from '@/auth/middleware';
import { Role } from '@/types/enums';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { z } from 'zod';

const generatePDF = (title: string, headers: string[], data: any[]) => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text(title, 14, 15);

    // Add timestamp
    doc.setFontSize(10);
    doc.text(`Generated on: ${format(new Date(), 'PPpp')}`, 14, 25);

    // Add table
    autoTable(doc, {
        head: [headers],
        body: data,
        startY: 35,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [71, 85, 105] },
        alternateRowStyles: { fillColor: [248, 250, 252] },
    });

    return doc.output('arraybuffer');
};

export const exportCampaigns = validatedActionWithUser(
    z.object({}),
    async (_, __, user) => {
        try {
            const campaignsWhere =
                user.role === Role.ORGANIZATION
                    ? { organizationId: user.id }
                    : {};

            const campaigns = await prisma.campaign.findMany({
                where: campaignsWhere,
                include: {
                    organization: {
                        select: { name: true, email: true },
                    },
                    city: {
                        select: { name: true },
                    },
                    participants: {
                        select: { user: { select: { name: true } } },
                    },
                },
                orderBy: { startTime: 'desc' },
            });

            const headers = [
                'Campaign Name',
                'Organization',
                'Location',
                'Start Time',
                'End Time',
                'Participants',
            ];
            const data = campaigns.map(campaign => [
                campaign.name,
                campaign.organization.name,
                `${campaign.city.name} - ${campaign.location}`,
                format(campaign.startTime, 'PPp'),
                format(campaign.endTime, 'PPp'),
                campaign.participants.length.toString(),
            ]);

            const buffer = generatePDF('Campaigns Report', headers, data);
            return { success: true, data: buffer };
        } catch (error) {
            return { error: 'Failed to export campaigns' };
        }
    },
);

export const exportParticipants = validatedActionWithUser(
    z.object({}),
    async (_, __, user) => {
        if (user.role !== Role.ADMIN) {
            return { error: 'Not authorized' };
        }

        try {
            const participants = await prisma.user.findMany({
                where: {
                    role: Role.PARTICIPANT,
                    deletedAt: null,
                },
                include: {
                    city: {
                        select: { name: true },
                    },
                },
                orderBy: { createdAt: 'desc' },
            });

            const headers = [
                'Name',
                'Email',
                'Phone',
                'Blood Group',
                'City',
                'Joined Date',
            ];
            const data = participants.map(participant => [
                participant.name || 'N/A',
                participant.email,
                participant.phone || 'N/A',
                participant.bloodGroup?.replace('_', ' ') || 'N/A',
                participant.city?.name || 'N/A',
                format(participant.createdAt, 'PPp'),
            ]);

            const buffer = generatePDF('Participants Report', headers, data);
            return { success: true, data: buffer };
        } catch (error) {
            return { error: 'Failed to export participants' };
        }
    },
);

export const exportBloodRequests = validatedActionWithUser(
    z.object({}),
    async (_, __, user) => {
        if (user.role !== Role.ADMIN) {
            return { error: 'Not authorized' };
        }

        try {
            const requests = await prisma.bloodRequest.findMany({
                include: {
                    user: {
                        select: { name: true, email: true },
                    },
                    city: {
                        select: { name: true },
                    },
                },
                orderBy: { createdAt: 'desc' },
            });

            const headers = [
                'Requester',
                'Blood Group',
                'City',
                'Location',
                'Phone',
                'Status',
                'Date',
            ];
            const data = requests.map(request => [
                request.user?.name || 'N/A',
                request.bloodGroup.replace('_', ' '),
                request.city.name,
                request.location,
                request.phone,
                request.status,
                format(request.createdAt, 'PPp'),
            ]);

            const buffer = generatePDF('Blood Requests Report', headers, data);
            return { success: true, data: buffer };
        } catch (error) {
            return { error: 'Failed to export blood requests' };
        }
    },
);
