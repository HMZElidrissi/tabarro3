'use server';

import { getUser } from '@/auth/session';
import { logActivity } from '@/lib/utils';
import { ActivityType } from '@/types/enums';
import { cookies } from 'next/headers';

export async function signOut() {
    const user = await getUser();
    await logActivity(user!.id, ActivityType.SIGN_OUT);
    (await cookies()).delete('session');
}
