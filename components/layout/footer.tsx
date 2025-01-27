import Image from 'next/image';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

interface FooterProps {
    dict: any;
}

export default function Footer({ dict }: FooterProps) {
    const socialLinks = [
        {
            icon: FaInstagram,
            href: 'https://www.instagram.com/rotaract_les_merinides/',
            label: 'Instagram',
        },
        {
            icon: FaLinkedin,
            href: 'https://www.linkedin.com/company/rotaract-les-merinides/',
            label: 'LinkedIn',
        },
    ];

    return (
        <footer className="relative border-t bg-gradient-to-b from-brand-700 to-brand-900">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
                <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                    <div className="flex flex-col items-center gap-4 md:items-start">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/logo_white.svg"
                                alt="tabarro3 Logo"
                                width={32}
                                height={32}
                                className="w-auto h-20"
                            />
                        </div>
                        <p className="text-center text-sm text-white max-w-sm md:text-start">
                            {dict.footer.byRotaract}
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-4 md:items-end">
                        <div className="flex items-center gap-2">
                            {socialLinks.map(link => (
                                <Button
                                    key={link.label}
                                    variant="ghost"
                                    size="icon"
                                    asChild
                                    className="rounded-full bg-white/80 text-brand-600 hover:bg-brand-100 hover:text-brand-700 transition-colors duration-300">
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={link.label}>
                                        <link.icon className="h-5 w-5" />
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-brand-200/50">
                    <p className="text-center text-sm text-white">
                        © {new Date().getFullYear()} tabarro3.{' '}
                        {dict.footer.allRightsReserved}
                    </p>
                </div>
            </div>
        </footer>
    );
}
