export enum JobType {
    CAMPAIGN_NOTIFICATION = 'CAMPAIGN_NOTIFICATION',
    BLOOD_REQUEST_NOTIFICATION = 'BLOOD_REQUEST_NOTIFICATION',
}

export enum JobStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
}

export interface Job {
    id: string;
    type: JobType;
    payload: any;
    status: JobStatus;
    attempts: number;
    maxAttempts: number;
    error?: string;
    createdAt: Date;
    updatedAt: Date;
    processedAt?: Date;
}
