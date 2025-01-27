import OrganizationsClient from '@/components/organizations/organizations-client';
import { getUser } from '@/auth/session';
import { redirect } from 'next/navigation';
import { Role } from '@/types/enums';

export default async function OrganizationsPage() {
    const user = await getUser();
    if (user?.role !== Role.ADMIN) {
        redirect('/dashboard');
    }
    return <OrganizationsClient />;
}
