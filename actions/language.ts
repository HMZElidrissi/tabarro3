'use server';

import { cookies } from 'next/headers';

export async function getCurrentLanguage() {
    const cookieStore = await cookies();
    const currentLocale = cookieStore.get('NEXT_LOCALE');
    return currentLocale?.value || 'en'; // default to 'en' if no language is set
}

export async function switchLanguage(newLocale: string) {
    const cookieStore = await cookies();
    cookieStore.set('NEXT_LOCALE', newLocale, {
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });
}
