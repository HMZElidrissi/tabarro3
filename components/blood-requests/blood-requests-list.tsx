import { BloodRequestCard } from '@/components/blood-requests/blood-request-card';
import { BloodRequest } from '@/types/blood-request';

interface BloodRequestsListProps {
    requests: BloodRequest[];
}

export default function BloodRequestsList({
    requests,
}: BloodRequestsListProps) {
    return (
        <div className="container mx-auto py-8">
            <div className="space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Blood Requests</h1>
                    <p className="text-muted-foreground">
                        Current blood donation requests in your area
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map(request => (
                        <BloodRequestCard key={request.id} request={request} />
                    ))}
                </div>
            </div>
        </div>
    );
}
