import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Organization, WithContext } from 'schema-dts';
import Script from 'next/script';

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tabarro3.ma';

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: 'Tabarro3 | Blood Donation Awareness Platform',
        template: '%s | Tabarro3',
    },
    description:
        'Join our community of blood donors and save lives. Find blood donation campaigns, connect with donors, and respond to urgent blood requests in your area.',
    openGraph: {
        title: 'Tabarro3 - Blood Donation Awareness Platform',
        description:
            'Connect with blood donors, organize donation campaigns, and help save lives. Join our growing community of blood donors across the region.',
        siteName: 'Tabarro3',
        url: baseUrl,
        images: [
            {
                url: `${baseUrl}/og-image.png`,
                width: 1200,
                height: 630,
                alt: 'Tabarro3 - Blood Donation Community Platform',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tabarro3 - Blood Donation Awareness Platform',
        description:
            'Connect with blood donors, organize donation campaigns, and help save lives. Join our growing community of blood donors.',
        images: [
            {
                url: `${baseUrl}/og-image.png`,
                width: 1200,
                height: 630,
                alt: 'Tabarro3 - Blood Donation Community Platform',
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
    keywords: [
        'blood donation',
        'blood donors',
        'donation campaigns',
        'blood requests',
        'emergency blood',
        'volunteer donors',
        'blood donation awareness',
    ],
};

const jsonLd: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tabarro3',
    description:
        'A community platform connecting blood donors with those in need, organizing blood donation campaigns, and raising awareness about the importance of blood donation.',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['English', 'Arabic'],
    },
    sameAs: [
        'https://www.facebook.com/tabarro3',
        'https://www.twitter.com/tabarro3',
        'https://www.instagram.com/rotaract_les_merinides/',
    ],
};

interface RootLayoutProps {
    children: React.ReactNode;
    params: { lang: string }; // For i18n support based on middleware
}

export default function RootLayout({
    children,
    params: { lang },
}: Readonly<RootLayoutProps>) {
    return (
        <html
            lang={lang}
            suppressHydrationWarning
            className={nunitoFont.className}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <head>
                <link rel="canonical" href={baseUrl} />
                <Script
                    id="json-ld"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="antialiased bg-gray-50">{children}</body>
        </html>
    );
}
