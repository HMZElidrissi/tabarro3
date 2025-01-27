'use client';

import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { languages } from '@/config/home';
import { useRouter } from 'next/navigation';
import { useUser } from '@/auth';
import { switchLanguage } from '@/actions/language';
import { useState } from 'react';
import { signOut } from '@/actions/sign-out';
import { Loader2, LogOut } from 'lucide-react';
import { Role } from '@/types/enums';

interface MobileNavProps {
    dict: any;
    initialLocale: string;
}

export function MobileNav({ dict, initialLocale }: MobileNavProps) {
    const { user } = useUser();
    const router = useRouter();
    const [currentLocale, setCurrentLocale] = useState(initialLocale);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await signOut();
            router.push('/sign-in');
        } catch (error) {
            console.error('Error signing out:', error);
            setIsLoading(false);
        }
    };

    const handleLanguageSwitch = async (newLocale: string) => {
        await switchLanguage(newLocale);
        setCurrentLocale(newLocale);
        router.refresh();
    };

    const mobileMenu = [
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

    return (
        <div className="flex flex-col space-y-4">
            {mobileMenu.map(item => (
                <Button
                    key={item.name}
                    asChild
                    variant="ghost"
                    className="w-full justify-start">
                    <Link href={item.href}>{item.name}</Link>
                </Button>
            ))}

            <Accordion type="single" collapsible>
                <AccordionItem value="languages">
                    <AccordionTrigger>
                        {dict.common.selectLanguage}
                    </AccordionTrigger>
                    <AccordionContent aria-describedby="languages">
                        <div className="flex flex-col space-y-2">
                            {languages.map(language => (
                                <Button
                                    key={language.code}
                                    variant="ghost"
                                    className="justify-start"
                                    onClick={() =>
                                        handleLanguageSwitch(language.code)
                                    }>
                                    {language.name}
                                    {language.code === currentLocale && (
                                        <span className="ml-2 h-2 w-2 rounded-full bg-brand-500" />
                                    )}
                                </Button>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <div className="border-t pt-4">
                {user ? (
                    <>
                        <Button
                            variant="default"
                            className="w-full bg-brand-600 text-white hover:bg-brand-700">
                            <Link
                                href={
                                    user.role === Role.PARTICIPANT
                                        ? '/profile'
                                        : '/dashboard'
                                }>
                                {user.name || dict.common.profile}
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="mt-2 w-full"
                            onClick={e => {
                                e.preventDefault();
                                handleLogout();
                            }}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    <span>{dict.common.signingOut}</span>
                                </>
                            ) : (
                                <>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>{dict.common.signOut}</span>
                                </>
                            )}
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            variant="default"
                            className="w-full bg-brand-600 text-white hover:bg-brand-700">
                            <Link href="/sign-in">{dict.common.signIn}</Link>
                        </Button>
                        <Button variant="outline" className="mt-2 w-full">
                            <Link href="/sign-up">{dict.common.signUp}</Link>
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
