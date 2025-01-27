import { getDictionary } from '@/i18n/get-dictionary';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { DesktopNav } from '@/components/layout/desktop-nav';
import { MobileNav } from '@/components/layout/mobile-nav';
import Footer from '@/components/layout/footer';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { DialogTitle } from '@/components/ui/dialog';

interface LayoutProps {
    children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
    const dict = await getDictionary();

    return (
        <div className="flex min-h-screen flex-col bg-gray-100">
            <header className="sticky top-0 z-50 w-full border-b bg-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex h-16 items-center">
                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex flex-1">
                            <DesktopNav dict={dict} />
                        </div>

                        {/* Mobile Navigation */}
                        <Sheet>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="ml-2">
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
                                    <DialogTitle>Mobile Navigation</DialogTitle>
                                </VisuallyHidden>
                                <MobileNav dict={dict} />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            <main className="flex-1">{children}</main>

            <Footer dict={dict} />
        </div>
    );
}
