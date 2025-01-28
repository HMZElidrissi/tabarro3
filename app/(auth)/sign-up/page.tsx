import { Login } from '@/components/auth/login';
import { Suspense } from 'react';
import { AuthCardSkeleton } from '@/components/loading/auth-card-skeleton';

export const metadata = {
    title: 'Sign up',
};

export default function SignUpPage() {
    return (
        <Suspense fallback={<AuthCardSkeleton />}>
            <Login mode="signup" />
        </Suspense>
    );
}
