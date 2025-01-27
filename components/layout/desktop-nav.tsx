'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, User } from 'lucide-react';
import Link from 'next/link';
import { languages } from '@/config/home';
import { useRouter } from 'next/navigation';

interface DesktopNavProps {
    dict: any;
}

export function DesktopNav({ dict }: DesktopNavProps) {
    const desktopMenu = [
        {
            name: dict.menu.bloodRequests,
            href: '/requests',
        },
        {
            name: dict.menu.newCampaigns,
            href: '/campaigns',
        },
        {
            name: dict.menu.donationCenters,
            href: '/#map',
        },
        {
            name: dict.menu.whyDonateBlood,
            href: '/#benefits',
        },
        {
            name: dict.menu.whoCanDonateBlood,
            href: '/#criterias',
        },
    ];

    const router = useRouter();

    const switchLanguage = async (newLocale: string) => {
        document.cookie = `NEXT_LOCALE=${newLocale};path=/;sameSite=strict${
            process.env.NODE_ENV === 'production' ? ';secure' : ''
        }`;
        router.refresh();
    };

    return (
        <div className="flex-1 flex justify-center bg-gray-100">
            <nav className="flex items-center space-x-4 lg:space-x-6">
                {desktopMenu.map(item => (
                    <Button
                        asChild
                        variant="ghost"
                        key={item.name}
                        className="hover:bg-brand-50 text-gray-900 hover:text-brand-700 transition-colors duration-200">
                        <Link href={item.href} className="text-sm font-medium">
                            {item.name}
                        </Link>
                    </Button>
                ))}

                <DropdownMenu>
                    <DropdownMenuTrigger
                        asChild
                        className="focus-visible:ring-0">
                        <Button
                            variant="outline"
                            size="lg"
                            className="flex items-center justify-items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300 shadow-sm transition-colors duration-200">
                            <Globe className="h-5 w-5 text-gray-500" />
                            <span className="text-sm font-medium">
                                {
                                    languages.find(lang =>
                                        document.cookie.includes(
                                            `NEXT_LOCALE=${lang.code}`,
                                        ),
                                    )?.name
                                }
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-40">
                        {languages.map(language => (
                            <DropdownMenuItem
                                key={language.code}
                                onClick={() => switchLanguage(language.code)}
                                className="flex items-center justify-between hover:bg-brand-50 cursor-pointer">
                                {language.name}
                                {document.cookie.includes(
                                    `NEXT_LOCALE=${language.code}`,
                                ) && (
                                    <span className="h-2 w-2 rounded-full bg-brand-500" />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger
                        asChild
                        className="focus-visible:ring-0">
                        <Button
                            variant="default"
                            size="lg"
                            className="flex items-center justify-items-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-colors duration-200">
                            <User className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                {dict.common.signIn}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem className="hover:bg-brand-50">
                            <Link
                                href="/profile"
                                className="w-full text-gray-700">
                                {dict.common.profile}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-brand-50">
                            <Link
                                href="/signout"
                                className="w-full text-gray-700">
                                {dict.common.signOut}
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </div>
    );
}
