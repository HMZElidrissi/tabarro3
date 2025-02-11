import { NextRequest, NextResponse } from 'next/server';
import { processPendingJobs } from '@/jobs/processor';

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');

        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return new Response('Unauthorized', {
                status: 401,
            });
        }

        const processedCount = await processPendingJobs();

        return NextResponse.json({
            success: true,
            processedCount,
        });
    } catch (error) {
        console.error('Job processing failed:', error);
        return NextResponse.json(
            { error: 'Failed to process jobs' },
            { status: 500 },
        );
    }
}

export const config = {
    maxDuration: 300, // 5 minutes in seconds
};
