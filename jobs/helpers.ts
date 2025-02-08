import { prisma } from '@/lib/prisma';
import { JobType } from '@prisma/client';

export async function queueCampaignNotification(campaignId: number) {
    // Create the job - recipients will be fetched during processing
    return prisma.job.create({
        data: {
            type: JobType.CAMPAIGN_NOTIFICATION,
            payload: {
                campaignId,
            },
        },
    });
}

export async function queueBloodRequestNotification(requestId: number) {
    // Create the job - recipients will be fetched during processing
    return prisma.job.create({
        data: {
            type: JobType.BLOOD_REQUEST_NOTIFICATION,
            payload: {
                requestId,
            },
        },
    });
}

// Helper function to track metrics (optional)
export async function getNotificationMetrics() {
    const [totalJobs, pendingJobs, failedJobs, completedJobs] =
        await Promise.all([
            prisma.job.count(),
            prisma.job.count({ where: { status: 'PENDING' } }),
            prisma.job.count({ where: { status: 'FAILED' } }),
            prisma.job.count({ where: { status: 'COMPLETED' } }),
        ]);

    const recentFailures = await prisma.job.findMany({
        where: {
            status: 'FAILED',
            updatedAt: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
            },
        },
        select: {
            id: true,
            type: true,
            error: true,
            attempts: true,
            updatedAt: true,
        },
        orderBy: {
            updatedAt: 'desc',
        },
        take: 10,
    });

    return {
        totalJobs,
        pendingJobs,
        failedJobs,
        completedJobs,
        recentFailures,
    };
}
