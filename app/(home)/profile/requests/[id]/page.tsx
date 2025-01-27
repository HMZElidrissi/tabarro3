import { getUser } from '@/auth/session';
import { redirect } from 'next/navigation';
import { getBloodRequest } from '@/actions/profile';
import { Role } from '@/types/enums';
import { RequestForm } from '@/components/profile/request-form';
import { BloodRequest } from '@/types/blood-request';

export default async function EditRequestPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const user = await getUser();

    if (!user) {
        redirect('/sign-in');
    }

    if (user.role !== Role.PARTICIPANT) {
        redirect('/dashboard');
    }

    const request = await getBloodRequest(parseInt(id));

    if (!request || request.userId !== user.id) {
        redirect('/profile');
    }

    return (
        <div className="container py-8 max-w-2xl mx-auto">
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Edit Blood Request
                    </h1>
                    <p className="text-muted-foreground">
                        Update your blood request details
                    </p>
                </div>
                <RequestForm
                    request={request as BloodRequest}
                    userId={user.id}
                    mode="edit"
                />
            </div>
        </div>
    );
}
