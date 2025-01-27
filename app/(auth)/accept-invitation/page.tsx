import { Login } from '@/components/auth/login';
import { Suspense } from 'react';
import { AuthCardSkeleton } from '@/components/loading/auth-card-skeleton';

export const metadata = {
    title: 'Softwareinstore | Accept Invitation',
};

export default function AcceptInvitationPage() {
    return (
        <Suspense fallback={<AuthCardSkeleton />}>
            <Login mode="accept-invitation" />
        </Suspense>
    );
}
