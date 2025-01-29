import { Login } from '@/components/auth/login';
import { Suspense } from 'react';
import { AuthCardSkeleton } from '@/components/loading/auth-card-skeleton';
import { getDictionary } from '@/i18n/get-dictionary';

export const metadata = {
    title: 'Sign up',
};

export default async function SignUpPage() {
    const dict = await getDictionary();

    return (
        <Suspense fallback={<AuthCardSkeleton />}>
            <Login mode="signup" dict={dict} />
        </Suspense>
    );
}
