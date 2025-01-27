import { BreadcrumbNav } from '@/components/dashboard/breadcrumb-nav';

interface DashboardShellProps {
    children: React.ReactNode;
    header?: string;
    description?: string;
    toolbar?: React.ReactNode;
}

export function DashboardShell({
    children,
    header,
    description,
    toolbar,
}: DashboardShellProps) {
    return (
        <div className="w-full flex-1 space-y-4 p-8 pt-6">
            <BreadcrumbNav />

            <div className="flex items-center justify-between space-y-2">
                <div>
                    {header && (
                        <h2 className="text-3xl font-bold tracking-tight">
                            {header}
                        </h2>
                    )}
                    {description && (
                        <p className="text-muted-foreground">{description}</p>
                    )}
                </div>
                {toolbar}
            </div>
            {children}
        </div>
    );
}
