import type { Metadata } from 'next';
import { Nunito, Tajawal } from 'next/font/google';
import './globals.css';
import { Organization, WithContext } from 'schema-dts';
import Script from 'next/script';
import { cookies } from 'next/headers';
import { getDictionary } from '@/i18n/get-dictionary';
import { i18n } from '@/i18n/i18n-config';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
});

const tajawal = Tajawal({
    weight: ['200', '300', '400', '500', '700', '800', '900'],
    variable: '--font-tajawal',
    subsets: ['arabic'],
    display: 'swap',
    fallback: ['nunito', 'sans-serif'],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tabarro3.ma';

export async function generateMetadata(): Promise<Metadata> {
    const cookieStore = await cookies();
    const locale = cookieStore.get('NEXT_LOCALE')?.value || i18n.defaultLocale;
    const dictionary = await getDictionary();

    return {
        metadataBase: new URL(baseUrl),
        title: {
            default: dictionary.metadata.defaultTitle,
            template: dictionary.metadata.template,
        },
        description: dictionary.metadata.description,
        openGraph: {
            title: dictionary.metadata.ogTitle,
            description: dictionary.metadata.ogDescription,
            siteName: 'tabarro3',
            url: baseUrl,
            images: [
                {
                    url: `${baseUrl}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: dictionary.metadata.ogImageAlt,
                },
            ],
            locale: locale === 'ar' ? 'ar_MA' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: dictionary.metadata.twitterTitle,
            description: dictionary.metadata.twitterDescription,
            images: [
                {
                    url: `${baseUrl}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: dictionary.metadata.twitterImageAlt,
                },
            ],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        keywords: dictionary.metadata.keywords,
    };
}

const getJsonLd = async (): Promise<WithContext<Organization>> => {
    const dictionary = await getDictionary();

    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Tabarro3',
        description: dictionary.metadata.jsonLdDescription,
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: ['English', 'Arabic'],
        },
        sameAs: [
            'https://www.linkedin.com/company/rotaract-les-merinides/',
            'https://www.instagram.com/rotaract_les_merinides/',
        ],
    };
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const locale = cookieStore.get('NEXT_LOCALE')?.value || i18n.defaultLocale;
    const isRTL = locale === 'ar';
    const jsonLd = await getJsonLd();

    return (
        <html
            lang={locale}
            dir={isRTL ? 'rtl' : 'ltr'}
            suppressHydrationWarning
            className={cn(
                'antialiased transition-all',
                isRTL
                    ? [
                          tajawal.className,
                          tajawal.variable,
                          'text-right',
                          // '[&_*]:text-right',
                      ]
                    : [nunitoFont.className, 'text-left'],
            )}>
            <head>
                <link rel="canonical" href={baseUrl} />
                <Script
                    id="json-ld"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <Analytics />
            <body className="antialiased bg-gray-50">{children}</body>
        </html>
    );
}
