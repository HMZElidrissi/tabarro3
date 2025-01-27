'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { resetPassword } from '@/actions/password';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ActionState } from '@/auth/middleware';

interface ResetPasswordFormProps {
    token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [state, formAction, pending] = useActionState<ActionState, FormData>(
        resetPassword,
        { error: '', success: '' },
    );

    useEffect(() => {
        if (state.error) {
            toast({
                title: 'Error',
                description: state.error,
                variant: 'destructive',
            });
        } else if (state.success) {
            toast({
                title: 'Success',
                description: state.success,
            });
            router.push('/sign-in');
        }
    }, [state, router, toast]);

    return (
        <form action={formAction} className="space-y-4">
            <input type="hidden" name="token" value={token} />

            <div>
                <Label htmlFor="password">New Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    maxLength={100}
                    className="mt-1"
                    placeholder="Enter your new password"
                    autoComplete="new-password"
                />
            </div>

            <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    maxLength={100}
                    className="mt-1"
                    placeholder="Confirm your new password"
                    autoComplete="new-password"
                />
            </div>

            <Button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700"
                disabled={pending}>
                {pending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting password...
                    </>
                ) : (
                    'Reset Password'
                )}
            </Button>
        </form>
    );
}
