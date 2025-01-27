import 'server-only';
import { i18n } from './i18n-config';
import { cookies } from 'next/headers';

const dictionaries = {
    en: () => import('@/dictionaries/en.json').then(module => module.default),
    ar: () => import('@/dictionaries/ar.json').then(module => module.default),
    fr: () => import('@/dictionaries/fr.json').then(module => module.default),
} as const;

export const getDictionary = async () => {
    const locale = await getLocale();

    if (!locale || !(locale in dictionaries)) {
        console.warn(`Locale '${locale}' not supported, falling back to 'ar'`);
        return dictionaries.ar();
    }
    return dictionaries[locale as keyof typeof dictionaries]();
};

export const getLocale = async () => {
    const cookieStore = await cookies();
    return cookieStore.get('NEXT_LOCALE')?.value || i18n.defaultLocale;
};
