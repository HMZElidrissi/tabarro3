import { Login } from '@/components/auth/login';
import { Suspense } from 'react';
import { AuthCardSkeleton } from '@/components/loading/auth-card-skeleton';
import { getDictionary } from '@/i18n/get-dictionary';

export const metadata = {
    title: 'Sign in',
};

export default async function SignInPage() {
    const dict = await getDictionary();

    return (
        <Suspense fallback={<AuthCardSkeleton />}>
            <Login mode="signin" dict={dict} />
        </Suspense>
    );
}
