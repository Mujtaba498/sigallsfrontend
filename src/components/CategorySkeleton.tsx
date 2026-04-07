
export default function CategorySkeleton() {
    return (
        <section className="max-w-6xl py-4 mx-auto px-4 animate-pulse">
            {/* Crumbs Skeleton */}
            <div className="flex gap-2 mb-4">
                <div className="h-4 w-12 bg-gray-200 rounded"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>

            {/* Title Skeleton */}
            <div className="mb-6">
                <div className="h-8 w-48 bg-gray-200 rounded mb-3"></div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="relative overflow-hidden rounded shadow bg-white">
                        <div className="h-48 w-full bg-gray-200"></div>
                        <div className="p-3 space-y-2">
                            <div className="h-3 w-16 bg-gray-200 rounded"></div>
                            <div className="h-4 w-full bg-gray-200 rounded"></div>
                            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                            <div className="h-3 w-24 bg-gray-200 rounded mt-2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
