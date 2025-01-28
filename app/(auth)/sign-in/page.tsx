import { Login } from '@/components/auth/login';
import { Suspense } from 'react';
import { AuthCardSkeleton } from '@/components/loading/auth-card-skeleton';

export const metadata = {
    title: 'Sign in',
};

export default function SignInPage() {
    return (
        <Suspense fallback={<AuthCardSkeleton />}>
            <Login mode="signin" />
        </Suspense>
    );
}
