'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button2 } from '@/components/ui/button';
import { Input, InputError } from '@/components/ui/input';
import { Label2 } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { signIn } from '@/actions/sign-in';
import { signUp } from '@/actions/sign-up';
import { acceptInvitation } from '@/actions/invitation';
import { ActionState } from '@/auth/middleware';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { REGIONS_AND_CITIES } from '@/config/locations';
import { useState } from 'react';
import { bloodGroups } from '@/config/blood-group';

type LoginProps = {
    mode?: 'signin' | 'signup' | 'accept-invitation';
};

export function Login({ mode = 'signin' }: LoginProps) {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const [selectedRegion, setSelectedRegion] = useState<string>();
    const [state, formAction, pending] = useActionState<ActionState, FormData>(
        mode === 'signin'
            ? signIn
            : mode === 'signup'
              ? signUp
              : acceptInvitation,
        { error: '' },
    );

    // Redirect to sign-in if trying to accept invitation without token
    if (mode === 'accept-invitation' && !token) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Invalid Invitation
                </h2>
                <p className="text-gray-600 mb-6">
                    This invitation link is invalid or has expired.
                </p>
                <Link
                    href="/sign-in"
                    className="text-gray-600 hover:text-gray-900 underline rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500">
                    Return to sign in
                </Link>
            </div>
        );
    }

    const isRegistrationMode =
        mode === 'signup' || mode === 'accept-invitation';

    return (
        <>
            {mode === 'accept-invitation' && (
                <>
                    <h2 className="text-2xl font-medium text-center text-gray-900">
                        Complete your registration
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        You've been invited to join. Please set up your account.
                    </p>
                </>
            )}

            <form className="mt-6 space-y-4" action={formAction}>
                {mode === 'accept-invitation' && (
                    <input type="hidden" name="token" value={token || ''} />
                )}

                {isRegistrationMode && (
                    <div>
                        <Label2 htmlFor="name">Full Name</Label2>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            maxLength={100}
                            className="block mt-1 w-full"
                            placeholder="Enter your full name"
                        />
                    </div>
                )}

                <div>
                    <Label2 htmlFor="email">Email</Label2>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={255}
                        defaultValue={email || ''}
                        readOnly={mode === 'accept-invitation' && !!email}
                        className="block mt-1 w-full"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <Label2 htmlFor="password">
                        {mode === 'signin' ? 'Password' : 'Create password'}
                    </Label2>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete={
                            mode === 'signin'
                                ? 'current-password'
                                : 'new-password'
                        }
                        required
                        minLength={8}
                        maxLength={100}
                        className="block mt-1 w-full"
                        placeholder={
                            mode === 'signin'
                                ? 'Enter your password'
                                : 'Create a secure password'
                        }
                    />
                    {isRegistrationMode && (
                        <p className="mt-1 text-sm text-gray-500">
                            Password must be at least 8 characters long
                        </p>
                    )}
                </div>

                {isRegistrationMode && (
                    <div>
                        <Label2 htmlFor="confirmPassword">
                            Confirm password
                        </Label2>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            minLength={8}
                            maxLength={100}
                            className="block mt-1 w-full"
                            placeholder="Confirm your password"
                        />
                    </div>
                )}

                {isRegistrationMode && (
                    <>
                        <div>
                            <Label2 htmlFor="phone">Phone Number</Label2>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                maxLength={20}
                                className="block mt-1 w-full"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        {mode === 'signup' && (
                            <div>
                                <Label2 htmlFor="bloodGroup">
                                    Blood Group
                                </Label2>
                                <Select name="bloodGroup">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your blood group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {bloodGroups.map(group => (
                                            <SelectItem
                                                key={group.value}
                                                value={group.value}>
                                                {group.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <div>
                            <Label2 htmlFor="region">Region</Label2>
                            <Select
                                name="region"
                                onValueChange={(value: string) => {
                                    setSelectedRegion(value);
                                }}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your region" />
                                </SelectTrigger>
                                <SelectContent>
                                    {REGIONS_AND_CITIES.map(region => (
                                        <SelectItem
                                            key={region.id}
                                            value={region.id.toString()}>
                                            {region.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label2 htmlFor="cityId">City</Label2>
                            <Select name="cityId">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your city" />
                                </SelectTrigger>
                                <SelectContent>
                                    {selectedRegion &&
                                        REGIONS_AND_CITIES.find(
                                            r =>
                                                r.id.toString() ===
                                                selectedRegion,
                                        )?.cities.map(city => (
                                            <SelectItem
                                                key={city.id}
                                                value={city.id.toString()}>
                                                {city.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </>
                )}

                {state?.error && (
                    <InputError messages={[state.error]} className="mt-2" />
                )}

                {mode === 'signin' && (
                    <div className="block">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="remember_me"
                                className="inline-flex items-center">
                                <input
                                    id="remember_me"
                                    type="checkbox"
                                    name="remember"
                                    className="rounded border-gray-300 text-brand-600 shadow-sm focus:border-brand-300 focus:ring focus:ring-brand-200 focus:ring-opacity-50"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>

                            <Link
                                href="/forgot-password"
                                className="text-sm text-gray-600 hover:text-gray-900 underline rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-end">
                    <Button2
                        className="w-full justify-center"
                        disabled={pending}>
                        {pending ? (
                            <>
                                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                Loading...
                            </>
                        ) : mode === 'signin' ? (
                            'Sign in'
                        ) : mode === 'signup' ? (
                            'Sign up'
                        ) : (
                            'Create account'
                        )}
                    </Button2>
                </div>
            </form>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                            {mode === 'signin'
                                ? 'Need an account?'
                                : 'Already have an account?'}
                        </span>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    {mode === 'signin' ? (
                        <>
                            <Link
                                href="/sign-up"
                                className="text-sm text-gray-600 hover:text-gray-900 underline">
                                Sign up for an account
                            </Link>
                        </>
                    ) : (
                        <Link
                            href="/sign-in"
                            className="text-sm text-gray-600 hover:text-gray-900 underline">
                            Sign in to your account
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}
