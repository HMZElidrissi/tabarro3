import { ResetPasswordForm } from '@/components/auth/reset-password';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { AuthCardSkeleton } from '@/components/loading/auth-card-skeleton';
import { Suspense } from 'react';
import { getDictionary } from '@/i18n/get-dictionary';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const dict = await getDictionary();
    return {
        title: dict.auth.resetPassword.title,
    };
}

export default async function ResetPasswordPage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const dict = await getDictionary();
    const { token } = await params;
    const resetRequest = await prisma.passwordReset.findFirst({
        where: {
            token,
            used: false,
            expiresAt: {
                gt: new Date(),
            },
        },
    });

    if (!resetRequest) {
        notFound();
    }

    return (
        <Suspense fallback={<AuthCardSkeleton />}>
            <ResetPasswordForm token={token} dict={dict} />
        </Suspense>
    );
}
