import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Loader2, MoreHorizontal } from 'lucide-react';
import { BloodRequest } from '@/types/blood-request';
import { Role } from '@/types/enums';
import { getBloodGroupLabel } from '@/config/blood-group';

interface BloodRequestsTableProps {
    requests: BloodRequest[];
    onDeleteRequest: (id: number) => void;
    onEditRequest: (id: number) => void;
    userRole: Role;
    isLoading?: boolean;
    isDeleting?: boolean;
}

export function BloodRequestsTable({
    requests,
    onDeleteRequest,
    onEditRequest,
    userRole,
    isLoading = false,
    isDeleting = false,
}: BloodRequestsTableProps) {
    const getStatusBadgeVariant = (status: string) => {
        switch (status.toLowerCase()) {
            case 'cancelled':
                return 'secondary';
            case 'fulfilled':
                return 'outline';
            case 'active':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    return (
        <div className="relative">
            {isLoading && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
            )}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Blood Group</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Requester</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.map(request => (
                        <TableRow key={request.id}>
                            <TableCell className="font-medium">
                                {request.description}
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">
                                    {getBloodGroupLabel(request.bloodGroup)}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {request.city.name} - {request.location}
                            </TableCell>
                            <TableCell>{request.phone}</TableCell>
                            <TableCell>
                                {request.user?.name || 'Admin Request'}
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={getStatusBadgeVariant(
                                        request.status,
                                    )}>
                                    {request.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {format(
                                    new Date(request.createdAt),
                                    'dd-MM-yyyy',
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() =>
                                                onEditRequest(request.id)
                                            }>
                                            Edit details
                                        </DropdownMenuItem>
                                        {(userRole === Role.ADMIN ||
                                            request.userId === null ||
                                            request.status === 'Pending') && (
                                            <DropdownMenuItem
                                                className="text-destructive hover:text-destructive-dark"
                                                onClick={() =>
                                                    onDeleteRequest(request.id)
                                                }
                                                disabled={isDeleting}>
                                                {isDeleting ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Deleting...
                                                    </>
                                                ) : (
                                                    'Delete request'
                                                )}
                                            </DropdownMenuItem>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
