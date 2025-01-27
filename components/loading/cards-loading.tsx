import { Skeleton } from '@/components/ui/skeleton';

export function CardsLoading() {
    return (
        <div className="container mx-auto py-8">
            <div className="space-y-6">
                <div>
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-4 w-72 mt-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-64 w-full" />
                    ))}
                </div>
            </div>
        </div>
    );
}
