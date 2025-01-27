'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { AccountForm } from '@/components/profile/account-form';
import { BloodRequestsGrid } from '@/components/profile/blood-requests-grid';
import { Separator } from '@/components/ui/separator';
import { User } from '@/types/user';
import { BloodRequest } from '@/types/blood-request';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { User2, Droplets } from 'lucide-react';

interface ProfileLayoutProps {
    user: User;
    bloodRequests: BloodRequest[];
}

export function ProfileLayout({ user, bloodRequests }: ProfileLayoutProps) {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState(
        searchParams.get('tab') || 'requests',
    );
    const [shouldAnimate, setShouldAnimate] = useState(false);

    // Handle initial animation after mount
    useEffect(() => {
        setShouldAnimate(true);
    }, []);

    return (
        <div
            className={cn(
                'container py-8 space-y-8 transition-all duration-300',
                shouldAnimate
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4',
            )}>
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">
                    Profile Settings
                </h2>
                <p className="text-muted-foreground">
                    Manage your personal information and blood donation requests
                </p>
            </div>
            <Separator />

            <Tabs
                value={activeTab}
                className="w-full"
                onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start">
                    <TabsTrigger
                        value="requests"
                        className="flex gap-2 items-center">
                        <Droplets className="h-6 w-6" />
                        Blood Requests
                    </TabsTrigger>
                    <TabsTrigger
                        value="account"
                        className="flex gap-2 items-center">
                        <User2 className="h-6 w-6" />
                        Account Information
                    </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                    <TabsContent
                        value="requests"
                        className={cn(
                            'transition-all duration-300',
                            activeTab === 'requests'
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-4',
                        )}>
                        <Card className="p-6">
                            <BloodRequestsGrid
                                initialRequests={bloodRequests}
                            />
                        </Card>
                    </TabsContent>
                    <TabsContent
                        value="account"
                        className={cn(
                            'transition-all duration-300',
                            activeTab === 'account'
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-4',
                        )}>
                        <Card>
                            <AccountForm user={user} />
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
