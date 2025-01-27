'use server';

import { z } from 'zod';
import { validatedActionWithUser } from '@/auth/middleware';
import { comparePasswords } from '@/auth/session';
import { getClientInfo } from '@/lib/ip';
import { logActivity } from '@/lib/utils';
import { ActivityType } from '@/types/enums';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const deleteAccountSchema = z.object({
    password: z.string().min(8).max(100),
});

const updateAccountSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().email('Invalid email address'),
});

export const deleteAccount = validatedActionWithUser(
    deleteAccountSchema,
    async (data, _, user) => {
        const { password } = data;

        const isPasswordValid = await comparePasswords(
            password,
            user.passwordHash,
        );
        if (!isPasswordValid) {
            return { error: 'Incorrect password. Account deletion failed.' };
        }

        const clientInfo = await getClientInfo();
        const ipAddress = clientInfo?.basic?.ip || 'Unknown';

        await logActivity(user.id, ActivityType.DELETE_ACCOUNT, ipAddress);

        // Soft delete
        await prisma.user.update({
            where: { id: user.id },
            data: {
                deletedAt: new Date(),
                email: `${user.email}-${user.id}-deleted`, // Ensure email uniqueness
            },
        });

        (await cookies()).delete('session');
        redirect('/sign-in');
    },
);

export const updateAccount = validatedActionWithUser(
    updateAccountSchema,
    async (data, _, user) => {
        const { name, email } = data;
        const ipAddress = (await getClientInfo()).basic.ip;

        await Promise.all([
            prisma.user.update({
                where: { id: user.id },
                data: { name, email },
            }),
            logActivity(user.id, ActivityType.UPDATE_ACCOUNT, ipAddress),
        ]);

        return {
            success:
                'Account updated successfully, changes will reflect when you refresh the page.',
        };
    },
);
