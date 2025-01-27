'use client';

import { useActionState } from 'react';
import { forgotPassword } from '@/actions/password';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ActionState } from '@/auth/middleware';

export function ForgotPasswordForm() {
    const [state, formAction, pending] = useActionState<ActionState, FormData>(
        forgotPassword,
        { error: '', success: '' },
    );

    return (
        <div className="mx-auto max-w-sm space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">Forgot Password</h1>
                <p className="text-gray-500">
                    Enter your email address and we'll send you instructions to
                    reset your password.
                </p>
            </div>

            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full"
                    />
                </div>

                {state?.error && (
                    <Alert variant="destructive">
                        <AlertDescription>{state.error}</AlertDescription>
                    </Alert>
                )}

                {state?.success && (
                    <Alert>
                        <AlertDescription>{state.success}</AlertDescription>
                    </Alert>
                )}

                <Button
                    type="submit"
                    className="w-full bg-brand-600 hover:bg-brand-700"
                    disabled={pending}>
                    {pending ? 'Sending...' : 'Send Reset Instructions'}
                </Button>
            </form>
        </div>
    );
}
