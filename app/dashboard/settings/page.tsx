import { DashboardShell } from '@/components/dashboard/shell';
import ProfileSettings from '@/components/settings/profile-settings';
import DeleteAccountDialog from '@/components/settings/delete-account-dialog';

export default function SettingsPage() {
    return (
        <DashboardShell
            header="Settings"
            description="Manage your account settings and preferences."
        >
            <div className="space-y-6">
                <ProfileSettings />
                <DeleteAccountDialog />
            </div>
        </DashboardShell>
    );
}
