'use client';

import { useActionState, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BloodRequest } from '@/types/blood-request';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { bloodGroups } from '@/config/blood-group';
import { REGIONS_AND_CITIES } from '@/config/locations';
import { ActionState } from '@/auth/middleware';
import { createBloodRequest, updateBloodRequest } from '@/actions/profile';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';

interface RequestFormProps {
    request?: BloodRequest | null;
    userId: string;
    mode: 'add' | 'edit';
}

export function RequestForm({ request, userId, mode }: RequestFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [selectedRegion, setSelectedRegion] = useState<string>(
        request?.city?.regionId?.toString() || '',
    );

    const [state, formAction, pending] = useActionState<ActionState, FormData>(
        mode === 'edit' ? updateBloodRequest : createBloodRequest,
        { error: '', success: '' },
    );

    useEffect(() => {
        if (state.success) {
            toast({
                title: 'Success',
                description: state.success,
            });
            router.push('/profile?tab=requests');
            router.refresh();
        } else if (state.error) {
            toast({
                title: 'Error',
                description: state.error,
                variant: 'destructive',
            });
        }
    }, [state, toast, router]);

    return (
        <Card className="p-6">
            <form action={formAction} className="space-y-4">
                <input type="hidden" name="userId" value={userId} />
                {request && (
                    <input type="hidden" name="id" value={request.id} />
                )}

                <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select
                        name="bloodGroup"
                        defaultValue={request?.bloodGroup || ''}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select blood group" />
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

                <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Select
                        value={selectedRegion}
                        onValueChange={setSelectedRegion}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select region" />
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

                <div className="space-y-2">
                    <Label htmlFor="cityId">City</Label>
                    <Select
                        name="cityId"
                        defaultValue={request?.cityId?.toString() || ''}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                            {selectedRegion &&
                                REGIONS_AND_CITIES.find(
                                    r => r.id.toString() === selectedRegion,
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

                <div className="space-y-2">
                    <Label htmlFor="location">Location Details</Label>
                    <Input
                        id="location"
                        name="location"
                        defaultValue={request?.location || ''}
                        required
                        placeholder="Enter specific location"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input
                        id="phone"
                        name="phone"
                        defaultValue={request?.phone || ''}
                        required
                        placeholder="Enter contact phone number"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        defaultValue={request?.description || ''}
                        placeholder="Enter additional details or requirements"
                        rows={3}
                    />
                </div>

                {mode === 'edit' && (
                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            name="status"
                            defaultValue={request?.status || 'active'}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="fulfilled">
                                    Fulfilled
                                </SelectItem>
                                <SelectItem value="cancelled">
                                    Cancelled
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={pending}>
                        {pending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {mode === 'add' ? 'Creating...' : 'Updating...'}
                            </>
                        ) : mode === 'add' ? (
                            'Create Request'
                        ) : (
                            'Update Request'
                        )}
                    </Button>
                </div>
            </form>
        </Card>
    );
}
