import { clsx, type ClassValue } from 'clsx';
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
