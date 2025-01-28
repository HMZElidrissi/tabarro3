import { CampaignCard } from '@/components/campaigns/campaign-card';
import { Campaign } from '@/types/campaign';

interface CampaignsListProps {
    campaigns: Campaign[];
    authenticated: boolean;
    userId?: string;
    dict: any;
}

export default function CampaignsList({
    campaigns,
    authenticated,
    userId,
    dict,
}: CampaignsListProps) {
    const ongoingCampaigns = campaigns.filter(
        campaign =>
            new Date(campaign.startTime) <= new Date() &&
            new Date(campaign.endTime) >= new Date(),
    );

    const upcomingCampaigns = campaigns.filter(
        campaign => new Date(campaign.startTime) > new Date(),
    );

    const pastCampaigns = campaigns.filter(
        campaign => new Date(campaign.endTime) < new Date(),
    );

    return (
        <div className="container mx-auto py-8">
            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">{dict.New_Campaigns}</h1>
                    <p className="text-muted-foreground">
                        {dict.New_Campaigns_Description}
                    </p>
                </div>

                {ongoingCampaigns.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {dict.Ongoing_Campaigns}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {ongoingCampaigns.map(campaign => (
                                <CampaignCard
                                    key={campaign.id}
                                    campaign={campaign}
                                    authenticated={authenticated}
                                    userId={userId}
                                    dict={dict}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {upcomingCampaigns.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {dict.Upcoming_Campaigns}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {upcomingCampaigns.map(campaign => (
                                <CampaignCard
                                    key={campaign.id}
                                    campaign={campaign}
                                    authenticated={authenticated}
                                    userId={userId}
                                    dict={dict}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {pastCampaigns.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">
                            {dict.Past_Campaigns}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pastCampaigns.map(campaign => (
                                <CampaignCard
                                    key={campaign.id}
                                    campaign={campaign}
                                    authenticated={authenticated}
                                    userId={userId}
                                    dict={dict}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {campaigns.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">
                            {dict.No_campaigns_found}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
