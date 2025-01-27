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
import { Role } from '@/types/enums';
import { Invitation } from '@/types/invitation';

interface InvitationsTableProps {
    invitations: Invitation[];
}

export function InvitationsTable({ invitations }: InvitationsTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Invited By</TableHead>
                    <TableHead>Sent</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invitations.map(invitation => (
                    <TableRow key={invitation.id}>
                        <TableCell>{invitation.email}</TableCell>
                        <TableCell>
                            <Badge
                                variant={
                                    invitation.role === Role.ADMIN
                                        ? 'default'
                                        : 'secondary'
                                }
                            >
                                {invitation.role}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {invitation.inviter.name ||
                                invitation.inviter.email}
                        </TableCell>
                        <TableCell>
                            {format(
                                new Date(invitation.invitedAt),
                                'MMM d, yyyy',
                            )}
                        </TableCell>
                        <TableCell>
                            {format(
                                new Date(invitation.expiresAt),
                                'MMM d, yyyy',
                            )}
                        </TableCell>
                    </TableRow>
                ))}
                {invitations.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                            No pending invitations
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
