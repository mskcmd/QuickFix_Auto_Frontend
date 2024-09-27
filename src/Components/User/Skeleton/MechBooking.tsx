import { Card, Skeleton } from "@nextui-org/react";

const MechBookingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Mechanic Header Skeleton */}
        <Card className="w-full space-y-5 p-8 mb-8" radius="lg">
          <div className="flex items-center space-x-4">
            <Skeleton className="rounded-full w-24 h-24" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <Skeleton className="h-4 w-1/2 rounded-lg" />
              <Skeleton className="h-4 w-1/4 rounded-lg" />
            </div>
          </div>
        </Card>

        {/* Booking Form Skeleton */}
        <Card className="w-full space-y-8 p-8" radius="lg">
          <Skeleton className="h-8 w-3/4 mx-auto rounded-lg" />
          
          {/* Name Input */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* Phone Input */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* Location Input */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* Services Selection */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 rounded-lg" />
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-3/4 rounded-lg" />
              <Skeleton className="h-10 w-1/4 rounded-lg" />
            </div>
          </div>

          {/* Date and Time Input */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* Problem Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>

          {/* Submit Button */}
          <Skeleton className="h-12 w-full rounded-lg" />
        </Card>
      </div>
    </div>
  );
};

export default MechBookingSkeleton;