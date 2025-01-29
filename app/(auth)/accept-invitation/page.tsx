import { Login } from '@/components/auth/login';
import { Suspense } from 'react';
import { AuthCardSkeleton } from '@/components/loading/auth-card-skeleton';
import { getDictionary } from '@/i18n/get-dictionary';

export const metadata = {
    title: 'Accept Invitation',
};

export default async function AcceptInvitationPage() {
    const dict = await getDictionary();
    return (
        <Suspense fallback={<AuthCardSkeleton />}>
            <Login mode="accept-invitation" dict={dict} />
        </Suspense>
    );
}
