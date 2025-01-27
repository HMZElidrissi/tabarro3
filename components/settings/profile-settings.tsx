'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { ActionState } from '@/auth/middleware';
import { updateAccount } from '@/actions/account';
import { useUser } from '@/auth';
import { useToast } from '@/hooks/use-toast';

export default function ProfileSettings() {
    const { user } = useUser();
    const { toast } = useToast();
    const [updateState, updateAction, updatePending] = useActionState<
        ActionState,
        FormData
    >(updateAccount, { error: '', success: '' });

    useEffect(() => {
        if (updateState.success) {
            toast({
                title: 'Success',
                description: updateState.success,
            });
        } else if (updateState.error) {
            toast({
                title: 'Error',
                description: updateState.error,
                variant: 'destructive',
            });
        }
    }, [updateState, toast]);

    const handleUpdateAccount = async (formData: FormData) => {
        await updateAction(formData);
    };

    if (!user) {
        return null;
    }

    return (
        <Card>
            <form action={handleUpdateAccount}>
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>
                        Update your personal information.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={user.name || ''}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={user.email}
                            placeholder="Enter your email"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={updatePending}>
                        {updatePending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
