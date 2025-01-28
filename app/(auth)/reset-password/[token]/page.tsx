import { ResetPasswordForm } from '@/components/auth/reset-password';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { AuthCardSkeleton } from '@/components/loading/auth-card-skeleton';
import { Suspense } from 'react';

export const metadata = {
    title: 'Reset password',
};

export default async function ResetPasswordPage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
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
            <ResetPasswordForm token={token} />
        </Suspense>
    );
}
