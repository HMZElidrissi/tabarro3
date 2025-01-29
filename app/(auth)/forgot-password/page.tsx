import { ForgotPasswordForm } from '@/components/auth/forgot-password';
import { AuthCardSkeleton } from '@/components/loading/auth-card-skeleton';
import { Suspense } from 'react';
import { getDictionary } from '@/i18n/get-dictionary';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const dict = await getDictionary();
    return {
        title: dict.auth.forgotPassword.title,
    };
}

export default async function ForgotPasswordPage() {
    const dict = await getDictionary();

    return (
        <Suspense fallback={<AuthCardSkeleton />}>
            <ForgotPasswordForm dict={dict} />
        </Suspense>
    );
}
