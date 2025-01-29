import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ActivityType } from '@/types/enums';
import { prisma } from '@/lib/prisma';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function logActivity(
    userId: string,
    type: ActivityType,
    ipAddress?: string,
) {
    await prisma.activityLog.create({
        data: {
            userId,
            action: type,
            ipAddress: ipAddress || '',
        },
    });
}

export const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'active':
            return 'bg-green-50 text-green-700 border-green-200';
        case 'fulfilled':
            return 'bg-gray-50 text-gray-700 border-gray-200';
        case 'cancelled':
            return 'bg-red-50 text-red-700 border-red-200';
        default:
            return 'bg-blue-50 text-blue-700 border-blue-200';
    }
};
