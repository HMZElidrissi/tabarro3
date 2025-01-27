import { Suspense } from 'react';
import BloodRequestsList from '@/components/blood-requests/blood-requests-list';
import { CardsLoading } from '@/components/loading/cards-loading';
import { getBloodRequests } from '@/actions/home';
import { BloodRequest } from '@/types/blood-request';

export default async function BloodRequestsPage() {
    const requests = await getBloodRequests();

    return (
        <main>
            <Suspense fallback={<CardsLoading />}>
                <BloodRequestsList requests={requests as BloodRequest[]} />
            </Suspense>
        </main>
    );
}
