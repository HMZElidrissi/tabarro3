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

interface MobileNavProps {
    dict: any;
}

export function MobileNav({ dict }: MobileNavProps) {
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

    const router = useRouter();

    const switchLanguage = async (newLocale: string) => {
        document.cookie = `NEXT_LOCALE=${newLocale};path=/;sameSite=strict${
            process.env.NODE_ENV === 'production' ? ';secure' : ''
        }`;
        router.refresh();
    };

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
                    <AccordionContent>
                        <div className="flex flex-col space-y-2">
                            {languages.map(language => (
                                <Button
                                    key={language.code}
                                    variant="ghost"
                                    className="justify-start"
                                    onClick={() =>
                                        switchLanguage(language.code)
                                    }>
                                    {language.name}
                                </Button>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <div className="border-t pt-4">
                <Button
                    asChild
                    variant="default"
                    className="w-full bg-brand-600 text-white hover:bg-brand-700">
                    <Link href="/sign-in">{dict.common.signIn}</Link>
                </Button>
                <Button asChild variant="outline" className="mt-2 w-full">
                    <Link href="/sign-up">{dict.common.signUp}</Link>
                </Button>
            </div>
        </div>
    );
}
