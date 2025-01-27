import { DashboardShell } from '@/components/dashboard/shell';
import { ParticipantFilters } from '@/components/participants/participant-filters';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import ParticipantsClient from '@/components/participants/participants-client';
import { BloodGroup } from '@/types/enums';

export default async function ParticipantsPage({
    searchParams,
}: {
    searchParams: Promise<{
        page: number;
        search: string;
        bloodGroup: BloodGroup;
    }>;
}) {
    const { page, search, bloodGroup } = await searchParams;
    const currentPage = page || 1;
    const currentSearch = search ?? undefined;

    return (
        <DashboardShell
            header="Participants"
            description="Manage the users who have access to your platform."
            toolbar={
                <Link href="/dashboard/participants/add">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Participant
                    </Button>
                </Link>
            }>
            {/* Filters Component */}
            <ParticipantFilters />

            <ParticipantsClient
                currentBloodGroup={bloodGroup}
                currentPage={currentPage}
                currentSearch={currentSearch}
            />
        </DashboardShell>
    );
}
