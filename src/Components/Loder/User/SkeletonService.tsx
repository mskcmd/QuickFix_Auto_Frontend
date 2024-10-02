import { Skeleton, Card } from "@nextui-org/react";

export default function SkeletonLayout() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Skeleton */}
        <div className="lg:w-1/3">
          <Card className="w-full p-4">
            <Skeleton className="h-8 w-1/2 mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </Card>
        </div>

        {/* Main Content Skeleton */}
        <div className="lg:w-2/3 space-y-8">
          {/* Shops Section Skeleton */}
          <Card className="p-4">
            <Skeleton className="h-8 w-1/2 mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </Card>

          {/* Freelancers Section Skeleton */}
          <Card className="p-4">
            <Skeleton className="h-8 w-1/2 mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </Card>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mt-8">
        <div className="flex space-x-4 mb-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-40" />
        </div>

        {/* Search Bar Skeleton */}
        <Skeleton className="h-10 w-full mb-6" />

        {/* Services List Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}
