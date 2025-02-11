import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tabarro3.ma';

    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/', '/campaigns', '/requests'],
                disallow: [
                    '/api/*',
                    '/dashboard/*',
                    '/signin',
                    '/signup',
                    '/accept-invitation',
                    '/reset-password',
                    '/forgot-password',
                    '/profile',
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
