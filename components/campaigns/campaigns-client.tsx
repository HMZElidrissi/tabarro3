'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { deleteCampaign, getCampaigns } from '@/actions/campaign';
import { useRouter } from 'next/navigation';
import { CampaignsTable } from '@/components/campaigns/campaigns-table';
import { ActionState } from '@/auth/middleware';
import { Campaign } from '@/types/campaign';
import { Role } from '@/types/enums';

interface CampaignsClientProps {
    currentPage: number;
    currentSearch: string;
    currentStatus: string;
    userRole: Role;
    organizationId?: string;
}

export default function CampaignsClient({
    currentPage,
    currentSearch,
    currentStatus,
    userRole,
    organizationId,
}: CampaignsClientProps) {
    const router = useRouter();
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const [deleteState, deleteAction, deletePending] = useActionState<
        ActionState,
        FormData
    >(deleteCampaign, { error: '', success: '' });

    // Load campaigns with filters
    useEffect(() => {
        loadCampaigns();
    }, [currentPage, currentSearch, currentStatus, organizationId]);

    useEffect(() => {
        if (deleteState.success) {
            toast({
                title: 'Success',
                description: deleteState.success,
            });
            loadCampaigns();
        } else if (deleteState.error) {
            toast({
                title: 'Error',
                description: deleteState.error,
                variant: 'destructive',
            });
        }
    }, [deleteState, toast]);

    const loadCampaigns = async () => {
        setIsLoading(true);
        try {
            const result = await getCampaigns({
                page: currentPage,
                pageSize: 10,
                search: currentSearch,
                status: currentStatus as
                    | 'upcoming'
                    | 'ongoing'
                    | 'completed'
                    | undefined,
                organizationId,
            });

            if (result) {
                setCampaigns(result.campaigns as Campaign[]);
                setTotalCount(result.totalCount);
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: `Failed to load campaigns: ${error instanceof Error ? error.message : 'Unknown error'}`,
                variant: 'destructive',
            });
        }
        setIsLoading(false);
    };

    const handleDelete = async (campaignId: number) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append('id', campaignId.toString());
            await deleteAction(formData);
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Campaigns</CardTitle>
                <CardDescription>
                    {totalCount} total campaigns found
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CampaignsTable
                    campaigns={campaigns}
                    userRole={userRole}
                    onEditCampaign={(campaignId: number) => {
                        router.push(`/dashboard/campaigns/edit/${campaignId}`);
                    }}
                    onDeleteCampaign={handleDelete}
                    isLoading={isLoading}
                    isDeleting={deletePending}
                />
            </CardContent>
        </Card>
    );
}
