import { shimmer } from '@/components/loading/shimmer';

export function HomePageSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Navigation Skeleton */}
            <nav className="mb-8">
                <div className={`h-10 bg-gray-200 w-full ${shimmer}`} />
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image Skeleton */}
                <div
                    className={`aspect-square bg-gray-200 rounded-lg ${shimmer}`}
                />

                {/* Product Details Skeleton */}
                <div className="space-y-4">
                    <div className={`h-8 bg-gray-200 w-3/4 ${shimmer}`} />
                    <div className={`h-6 bg-gray-200 w-1/4 ${shimmer}`} />
                    <div className={`h-10 bg-gray-200 w-1/2 ${shimmer}`} />
                    <div className={`h-12 bg-gray-200 w-full ${shimmer}`} />
                    <div className={`h-24 bg-gray-200 w-full ${shimmer}`} />
                </div>
            </div>

            {/* Product Tabs Skeleton */}
            <div className="mt-12">
                <div className="flex space-x-4 border-b">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className={`h-10 bg-gray-200 w-24 ${shimmer}`}
                        />
                    ))}
                </div>
                <div className={`h-40 bg-gray-200 w-full mt-4 ${shimmer}`} />
            </div>

            {/* Customer Reviews Skeleton */}
            <div className="mt-12">
                <div className={`h-8 bg-gray-200 w-1/4 mb-4 ${shimmer}`} />
                <div className={`h-10 bg-gray-200 w-40 mb-6 ${shimmer}`} />
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="mb-6">
                        <div
                            className={`h-6 bg-gray-200 w-1/3 mb-2 ${shimmer}`}
                        />
                        <div
                            className={`h-4 bg-gray-200 w-1/4 mb-2 ${shimmer}`}
                        />
                        <div className={`h-16 bg-gray-200 w-full ${shimmer}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
