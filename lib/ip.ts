'use server';

import { headers } from 'next/headers';

interface BrowserInfo {
    browser: string;
    os: string;
}

interface LanguagePreference {
    language: string;
    weight: number;
}

interface GeoInfo {
    country: string;
    city: string;
    region: string;
}

interface ServerInfo {
    deploymentId: string;
    region: string;
    proxy: string;
    infrastructure: string;
}

interface DeploymentInfo {
    environment: 'development' | 'production';
    serverInfo: Partial<ServerInfo>;
}

interface RequestInfo {
    environment: 'development' | 'production';
    basic: {
        ip: string;
        protocol: string;
        host: string;
    };
    geo: GeoInfo;
    client: {
        browser: string;
        os: string;
        device: 'mobile' | 'desktop';
        languages: LanguagePreference[];
    };
    deployment: DeploymentInfo;
    notice?: {
        message: string;
        availableInProd: string[];
        tip: string;
    };
}

export async function getClientInfo(): Promise<RequestInfo> {
    const headersList = await headers();
    const isDevelopment = process.env.NODE_ENV === 'development';
    const environment = isDevelopment ? 'development' : 'production';

    // Enhanced IP detection
    const ip = getClientIP(headersList);
    const userAgent = headersList.get('user-agent') ?? 'Unknown';
    const acceptLanguage = headersList.get('accept-language');
    const host = headersList.get('host') ?? 'Unknown';

    // Enhanced protocol detection
    const protocol = getProtocol(headersList);

    // Enhanced browser and device detection
    const browserInfo = parseBrowserInfo(userAgent);
    const languages = parseAcceptLanguage(acceptLanguage);
    const device = detectDevice(userAgent);

    // Initialize geo info with enhanced fallback
    const geoInfo = getGeoInfo(headersList, isDevelopment);

    // Enhanced deployment info
    const deploymentInfo: DeploymentInfo = {
        environment,
        serverInfo: getServerInfo(headersList, isDevelopment),
    };

    const info: RequestInfo = {
        environment,
        basic: {
            ip,
            protocol,
            host,
        },
        geo: geoInfo,
        client: {
            browser: browserInfo.browser,
            os: browserInfo.os,
            device,
            languages,
        },
        deployment: deploymentInfo,
    };

    if (isDevelopment) {
        info.notice = {
            message: 'Running in development mode with limited features',
            availableInProd: [
                'Accurate IP detection',
                'Geolocation data',
                'Vercel deployment information',
                'Infrastructure details',
            ],
            tip: 'Deploy to Vercel and add "export const runtime = \'edge\'" to enable all features',
        };
    }

    return info;
}

function getClientIP(headersList: Headers): string {
    const headers = [
        'x-vercel-ip',
        'x-real-ip',
        'x-forwarded-for',
        'cf-connecting-ip', // Cloudflare
        'x-client-ip',
        'x-forwarded',
        'forwarded-for',
        'forwarded',
        'true-client-ip',
        'x-cluster-client-ip',
    ];

    for (const header of headers) {
        const value = headersList.get(header);
        if (value) {
            // Handle comma-separated IPs (take the first one)
            return value.split(',')[0].trim();
        }
    }

    return process.env.NODE_ENV === 'development' ? '127.0.0.1' : 'Unknown';
}

function getProtocol(headersList: Headers): string {
    const protocolHeaders = [
        'x-forwarded-proto',
        'x-forwarded-protocol',
        'x-url-scheme',
        'front-end-https',
        'x-http-protocol',
    ];

    for (const header of protocolHeaders) {
        const value = headersList.get(header)?.toLowerCase();
        if (value === 'http' || value === 'https') {
            return value;
        }
    }

    // Check if connection is secure
    const connection = headersList.get('connection');
    if (connection?.includes('upgrade')) {
        return 'https';
    }

    return 'http';
}

function detectDevice(userAgent: string): 'mobile' | 'desktop' {
    const mobileKeywords = [
        'Mobile',
        'Android',
        'iPhone',
        'iPad',
        'Windows Phone',
        'webOS',
        'BlackBerry',
        'Opera Mini',
        'IEMobile',
    ];

    const isMobile = mobileKeywords.some(keyword =>
        userAgent.includes(keyword),
    );

    return isMobile ? 'mobile' : 'desktop';
}

function getGeoInfo(headersList: Headers, isDevelopment: boolean): GeoInfo {
    if (isDevelopment) {
        return {
            country: 'Unknown (dev mode)',
            city: 'Unknown (dev mode)',
            region: 'Unknown (dev mode)',
        };
    }

    // Try Vercel headers first
    const vercelGeo = {
        country: headersList.get('x-vercel-ip-country'),
        city: headersList.get('x-vercel-ip-city'),
        region: headersList.get('x-vercel-ip-region'),
    };

    if (vercelGeo.country) {
        return {
            country: vercelGeo.country,
            city: vercelGeo.city ?? 'Unknown',
            region: vercelGeo.region ?? 'Unknown',
        };
    }

    // Try Cloudflare headers as fallback
    const cfGeo = {
        country: headersList.get('cf-ipcountry'),
        city: headersList.get('cf-ipcity'),
        region: headersList.get('cf-region'),
    };

    if (cfGeo.country) {
        return {
            country: cfGeo.country,
            city: cfGeo.city ?? 'Unknown',
            region: cfGeo.region ?? 'Unknown',
        };
    }

    return {
        country: 'Unknown',
        city: 'Unknown',
        region: 'Unknown',
    };
}

function getServerInfo(
    headersList: Headers,
    isDevelopment: boolean,
): Partial<ServerInfo> {
    if (isDevelopment) {
        return {};
    }

    return {
        deploymentId: headersList.get('x-vercel-id') ?? undefined,
        region: headersList.get('x-vercel-region') ?? undefined,
        proxy: headersList.get('x-vercel-proxy') ?? undefined,
        infrastructure: headersList.get('x-vercel-infrastructure') ?? undefined,
    };
}

function parseBrowserInfo(userAgent: string): BrowserInfo {
    if (!userAgent || userAgent === 'Unknown') {
        return { browser: 'Unknown', os: 'Unknown' };
    }

    const browserPatterns = [
        { pattern: /Edg\//, name: 'Edge' },
        { pattern: /OPR\//, name: 'Opera' },
        { pattern: /Firefox\//, name: 'Firefox' },
        { pattern: /Chrome\//, name: 'Chrome' },
        { pattern: /Safari\//, name: 'Safari' },
    ];

    const osPatterns = [
        { pattern: /Windows NT 10.0/, name: 'Windows 10' },
        { pattern: /Windows NT 6.3/, name: 'Windows 8.1' },
        { pattern: /Windows NT 6.2/, name: 'Windows 8' },
        { pattern: /Windows NT 6.1/, name: 'Windows 7' },
        { pattern: /Windows NT/, name: 'Windows' },
        { pattern: /Mac OS X/, name: 'MacOS' },
        { pattern: /Android/, name: 'Android' },
        { pattern: /iOS|iPhone|iPad/, name: 'iOS' },
        { pattern: /Linux/, name: 'Linux' },
    ];

    const browser =
        browserPatterns.find(({ pattern }) => pattern.test(userAgent))?.name ??
        'Unknown';
    const os =
        osPatterns.find(({ pattern }) => pattern.test(userAgent))?.name ??
        'Unknown';

    return { browser, os };
}

function parseAcceptLanguage(
    acceptLanguage: string | null,
): LanguagePreference[] {
    if (!acceptLanguage) {
        return [{ language: 'Unknown', weight: 1.0 }];
    }

    try {
        return acceptLanguage
            .split(',')
            .map(lang => {
                const [language, weight = 'q=1.0'] = lang.trim().split(';');
                const parsedWeight = parseFloat(weight.replace('q=', ''));

                return {
                    language: language.trim(),
                    weight: isNaN(parsedWeight) ? 1.0 : parsedWeight,
                };
            })
            .filter(lang => lang.language && !isNaN(lang.weight))
            .sort((a, b) => b.weight - a.weight);
    } catch (error) {
        console.error('Error parsing accept-language header:', error);
        return [{ language: 'Unknown', weight: 1.0 }];
    }
}
