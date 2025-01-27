import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';

const stats = [
    {
        title: 'Total Revenue',
        value: '$45,231.89',
        description: '+20.1% from last month',
        icon: DollarSign,
    },
    {
        title: 'Subscriptions',
        value: '+2,350',
        description: '+180.1% from last month',
        icon: Users,
    },
    {
        title: 'Sales',
        value: '+12,234',
        description: '+19% from last month',
        icon: CreditCard,
    },
    {
        title: 'Active Now',
        value: '+573',
        description: '+201 since last hour',
        icon: Activity,
    },
];

export function DashboardStats() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map(stat => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-yellow-600 text-muted-foreground">
                            {stat.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
