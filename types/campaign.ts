import { User } from '@/types/user';
import { City } from '@/types/city';

export interface Campaign {
    id: number;
    name: string;
    description: string;
    cityId: number;
    city?: City;
    location: string;
    startTime: Date;
    endTime: Date;
    organizationId: string;
    createdAt: Date;
    updatedAt: Date;
    organization?: User;
    participants: CampaignParticipant[];
}

export interface CampaignParticipant {
    id: number;
    campaignId: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    campaign: Campaign;
    user: User;
}
