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
import { deleteParticipant, getParticipants } from '@/actions/participant';
import { useRouter } from 'next/navigation';
import { ParticipantsTable } from '@/components/participants/participants-table';
import { ActionState } from '@/auth/middleware';
import { User } from '@/types/user';
import { BloodGroup } from '@/types/enums';

interface ParticipantsClientProps {
    currentPage: number;
    currentSearch: string;
    currentBloodGroup: BloodGroup | null;
}

export default function ParticipantsClient({
    currentPage,
    currentSearch,
    currentBloodGroup,
}: ParticipantsClientProps) {
    const router = useRouter();
    const [participants, setParticipants] = useState<User[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const [deleteState, deleteAction, deletePending] = useActionState<
        ActionState,
        FormData
    >(deleteParticipant, { error: '', success: '' });

    // Load participants with filters
    useEffect(() => {
        loadParticipants();
    }, [currentPage, currentSearch, currentBloodGroup]);

    useEffect(() => {
        if (deleteState.success) {
            toast({
                title: 'Success',
                description: deleteState.success,
            });
            loadParticipants();
        } else if (deleteState.error) {
            toast({
                title: 'Error',
                description: deleteState.error,
                variant: 'destructive',
            });
        }
    }, [deleteState, toast]);

    const loadParticipants = async () => {
        setIsLoading(true);
        try {
            const result = await getParticipants({
                page: currentPage,
                pageSize: 10,
                search: currentSearch,
                bloodGroup: currentBloodGroup || undefined,
            });

            if (result) {
                setParticipants(result.participants as User[]);
                setTotalCount(result.totalCount);
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: `Failed to load participants: ${error instanceof Error ? error.message : 'Unknown error'}`,
                variant: 'destructive',
            });
        }
        setIsLoading(false);
    };

    const handleDelete = async (participantId: string) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append('id', participantId);
            await deleteAction(formData);
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Participants</CardTitle>
                <CardDescription>
                    {totalCount} total participants found
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ParticipantsTable
                    participants={participants}
                    onEditParticipant={(participantId: string) => {
                        router.push(
                            `/dashboard/participants/edit/${participantId}`,
                        );
                    }}
                    onDeleteParticipant={handleDelete}
                    isLoading={isLoading || deletePending}
                />
            </CardContent>
        </Card>
    );
}
