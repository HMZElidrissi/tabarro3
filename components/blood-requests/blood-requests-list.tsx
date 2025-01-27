import { BloodRequestCard } from '@/components/blood-requests/blood-request-card';
import { BloodRequest } from '@/types/blood-request';

interface BloodRequestsListProps {
    requests: BloodRequest[];
    dict: any;
}

export default function BloodRequestsList({
    requests,
    dict,
}: BloodRequestsListProps) {
    return (
        <div className="container mx-auto py-8">
            <div className="space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">
                        {dict.Blood_Requests}
                    </h1>
                    <p className="text-muted-foreground">
                        {dict.Blood_Requests_Description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map(request => (
                        <BloodRequestCard
                            key={request.id}
                            request={request}
                            dict={dict}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
