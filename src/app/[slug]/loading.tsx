import React from "react";

export default function Loading() {
    return (
        <main className="max-w-6xl mx-auto py-8 px-4 animate-pulse">
            <div className="grid grid-cols-10 gap-6 py-10">
                <div className="col-span-10 md:col-span-7">
                    <article>
                        {/* Title Skeleton */}
                        <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-10 bg-gray-200 rounded w-1/2 mb-4"></div>

                        {/* Meta Skeleton */}
                        <div className="mt-2 flex items-center gap-3">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                            <div className="h-5 bg-gray-200 rounded w-16"></div>
                        </div>

                        {/* ShareBar Skeleton */}
                        <div className="mt-4 flex gap-2">
                            <div className="h-8 w-8 bg-gray-200 rounded"></div>
                            <div className="h-8 w-8 bg-gray-200 rounded"></div>
                            <div className="h-8 w-8 bg-gray-200 rounded"></div>
                            <div className="h-8 w-20 bg-gray-200 rounded"></div>
                        </div>

                        {/* Hero Image Skeleton */}
                        <div className="mt-5 w-full h-[240px] md:h-[360px] bg-gray-200 rounded-md"></div>

                        {/* Content Skeleton */}
                        <div className="mt-8 space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-11/12"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                        </div>
                    </article>
                </div>

                {/* Sidebar Skeleton */}
                <aside className="col-span-10 md:col-span-3 lg:sticky lg:top-24 h-fit space-y-8">
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="space-y-4 mt-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0"></div>
                                <div className="flex-1 space-y-2 py-1">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </main>
    );
}
