import { ForgotPasswordForm } from '@/components/auth/forgot-password';
import { AuthCardSkeleton } from '@/components/loading/auth-card-skeleton';
import { Suspense } from 'react';

export const metadata = {
    title: 'Forgot password',
};

export default function ForgotPasswordPage() {
    return (
        <Suspense fallback={<AuthCardSkeleton />}>
            <ForgotPasswordForm />
        </Suspense>
    );
}
