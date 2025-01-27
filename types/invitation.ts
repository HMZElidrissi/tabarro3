import { Role } from '@/types/enums';
import { User } from '@/types/user';

export interface Invitation {
    id: string;
    email: string;
    role: Role;
    invitedBy: string;
    invitedAt: Date;
    expiresAt: Date;
    status: string;
    token: string;
    inviter: User;
}
