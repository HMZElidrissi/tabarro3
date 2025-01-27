import {
    Building2Icon,
    Calendar1Icon,
    Home,
    Settings,
    UsersIcon,
} from 'lucide-react';

export interface NavigationItem {
    title: string;
    icon: React.ElementType;
    href: string;
    badge?: string;
    pattern?: string;
}

export const mainNavigation: NavigationItem[] = [
    { title: 'Home', icon: Home, href: '/dashboard', pattern: '^/dashboard$' },
    {
        title: 'Participants',
        icon: UsersIcon,
        href: '/dashboard/participants',
        badge: 'Soon',
        pattern: '^/dashboard/participants',
    },
    {
        title: 'Organizations',
        icon: Building2Icon,
        href: '/dashboard/organizations',
        pattern: '^/dashboard/organizations',
    },
    {
        title: 'Campaigns',
        icon: Calendar1Icon,
        href: '/dashboard/campaigns',
        pattern: '^/dashboard/campaigns',
    },
];

export const secondaryNavigation: NavigationItem[] = [
    {
        title: 'Settings',
        icon: Settings,
        href: '/dashboard/settings',
        pattern: '^/dashboard/settings',
    },
];
