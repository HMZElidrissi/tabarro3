import { NextResponse } from 'next/server';
import { processPendingJobs } from '@/jobs/processor';

export async function POST(req: Request) {
    try {
        // Verify the secret token
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.split(' ')[1];

        if (token !== process.env.CRON_SECRET) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 },
            );
        }

        // Process pending jobs
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
