import { Skeleton } from "@nextui-org/react";

export default function BlogSkeleton() {
  const skeletonArray = Array.from({ length: 6 }); // Create an array to generate multiple skeletons

  return (
    <>
      <div className="relative w-full">
        {/* Header Skeleton Image */}
        <Skeleton className="w-full h-96" />

        {/* Overlay Skeleton */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center p-4">
          <Skeleton className="w-1/2 h-8 rounded" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skeletonArray.map((_, index) => (
            <div key={index} className="hover:shadow-xl transition-shadow duration-300 bg-white">
              {/* Card Skeleton */}
              <div className="p-4">
                {/* Skeleton for blog name */}
                <Skeleton className="w-1/4 h-4 mb-2" />

                {/* Skeleton for position name */}
                <Skeleton className="w-1/4 h-4 mb-2" />

                {/* Date Skeleton */}
                <Skeleton className="w-1/6 h-4 mb-2" />

                {/* Heading Skeleton */}
                <Skeleton className="w-3/4 h-6 mb-4" />

                {/* Image Skeleton */}
                <Skeleton className="w-full h-40 mb-4 rounded-lg" />

                {/* Description Skeleton */}
                <Skeleton className="w-full h-16 mb-4 rounded-lg" />

                {/* Button Skeleton */}
                <Skeleton className="w-1/2 h-10 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
