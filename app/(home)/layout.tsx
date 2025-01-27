import { getDictionary } from '@/i18n/get-dictionary';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { DesktopNav } from '@/components/layout/desktop-nav';
import { MobileNav } from '@/components/layout/mobile-nav';
import Footer from '@/components/layout/footer';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { DialogTitle } from '@/components/ui/dialog';
import { UserProvider } from '@/auth';
import { getUser } from '@/auth/session';
import { getCurrentLanguage } from '@/actions/language';
import Image from 'next/image';
import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
    const dict = await getDictionary();
    const userPromise = getUser();
    const currentLocale = await getCurrentLanguage();
    const isRTL = currentLocale === 'ar';

    return (
        <UserProvider userPromise={userPromise}>
            <div
                className="flex min-h-screen flex-col bg-gray-50"
                dir={isRTL ? 'rtl' : 'ltr'}>
                <header className="sticky top-0 z-50 w-full border-b bg-gray-100">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-8xl">
                        <div className="flex h-16 items-center justify-between">
                            {/* Logo */}
                            <Link href="/">
                                <Image
                                    src="/logo.svg"
                                    alt="Logo"
                                    width={150}
                                    height={40}
                                    className="h-10 w-auto mx-4"
                                    priority
                                />
                            </Link>

                            <div className="flex items-center">
                                {/* Mobile Navigation Button */}
                                <Sheet>
                                    <SheetTrigger
                                        asChild
                                        className="lg:hidden mr-4">
                                        <Button variant="ghost" size="icon">
                                            <Menu className="h-5 w-5" />
                                            <span className="sr-only">
                                                {dict.common.openMenu}
                                            </span>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent
                                        side="left"
                                        className="w-80"
                                        aria-describedby="Mobile Navigation">
                                        <VisuallyHidden>
                                            <DialogTitle>
                                                Mobile Navigation
                                            </DialogTitle>
                                        </VisuallyHidden>
                                        <MobileNav
                                            dict={dict}
                                            initialLocale={currentLocale}
                                        />
                                    </SheetContent>
                                </Sheet>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex flex-1 justify-center">
                                <DesktopNav
                                    dict={dict}
                                    initialLocale={currentLocale}
                                />
                            </div>

                            {/* Empty div for flex spacing in mobile view */}
                            <div className="w-10 lg:hidden"></div>
                        </div>
                    </div>
                </header>

                <main className="flex-1">{children}</main>

                <Footer dict={dict} />
            </div>
        </UserProvider>
    );
}
