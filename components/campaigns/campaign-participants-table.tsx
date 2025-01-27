import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Campaign } from '@/types/campaign';
import { format, parseISO } from 'date-fns';
import { getBloodGroupLabel } from '@/config/blood-group';
import { Badge } from '@/components/ui/badge';
import { UserCheck2 } from 'lucide-react';

interface CampaignParticipantsTableProps {
    campaign: Campaign;
}

export function CampaignParticipantsTable({
    campaign,
}: CampaignParticipantsTableProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="text-primary flex items-center">
                    <UserCheck2 className="h-4 w-4" />
                    {campaign.participants.length}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Campaign Participants</DialogTitle>
                    <DialogDescription>
                        Participants for campaign: {campaign.name}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Blood Group</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {campaign.participants.map(participant => (
                                <TableRow key={participant.id}>
                                    <TableCell className="font-medium">
                                        {participant.user.name}
                                    </TableCell>
                                    <TableCell>
                                        {participant.user.email}
                                    </TableCell>
                                    <TableCell>
                                        {participant.user.phone}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">
                                            {getBloodGroupLabel(
                                                participant.user.bloodGroup,
                                            )}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {campaign.participants.length === 0 && (
                        <div className="text-center py-4 text-muted-foreground">
                            No participants yet
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
