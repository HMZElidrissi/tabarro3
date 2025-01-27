export const i18n = {
    defaultLocale: 'ar',
    locales: ['fr', 'ar', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export function isValidLocale(locale: string | undefined): locale is Locale {
    return locale
        ? (i18n.locales as readonly string[]).includes(locale)
        : false;
}
