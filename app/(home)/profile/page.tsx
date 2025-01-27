import { getUser } from '@/auth/session';
import { redirect } from 'next/navigation';
import { ProfileLayout } from '@/components/profile/profile-layout';
import { getBloodRequests, getProfile } from '@/actions/profile';
import { Role } from '@/types/enums';
import { User } from '@/types/user';
import { BloodRequest } from '@/types/blood-request';

export default async function ProfilePage() {
    const user = await getUser();

    if (!user) {
        redirect('/signin');
    }

    if (user.role !== Role.PARTICIPANT) {
        redirect('/dashboard');
    }

    const profile = await getProfile(user.id);
    const bloodRequests = await getBloodRequests(user.id);

    return (
        <div className="flex flex-col bg-white">
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ProfileLayout
                        user={profile as User}
                        bloodRequests={bloodRequests as BloodRequest[]}
                    />
                </div>
            </div>
        </div>
    );
}
