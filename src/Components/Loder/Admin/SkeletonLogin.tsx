import { Skeleton } from "@nextui-org/react";

export default function SkeletonLogin() {
  return (
    <div className="flex justify-center items-center h-screen p-4 bg-gradient-to-r from-gray-800 to-gray-700">
      <div className="h-[85vh] w-[70vh] col-span-6 hidden md:block relative">
        {/* Skeleton for the image */}
        <Skeleton className="absolute inset-0 h-full w-full object-cover rounded-l-lg">
          <div className="h-full w-full bg-default-300 rounded-l-lg"></div>
        </Skeleton>
      </div>

      <div className="flex flex-col justify-center h-[85vh] w-[70vh] bg-white p-8 rounded-r-lg">
        {/* Skeleton for the title */}
        <Skeleton className="h-10 w-2/3 mb-8 rounded-lg bg-default-200">
          <div className="h-full w-full bg-default-200 rounded-lg"></div>
        </Skeleton>

        {/* Skeleton for form inputs */}
        <div className="space-y-5">
          <Skeleton className="h-10 w-full rounded-lg bg-default-200">
            <div className="h-full w-full bg-default-200 rounded-lg"></div>
          </Skeleton>

          <Skeleton className="h-10 w-full rounded-lg bg-default-200">
            <div className="h-full w-full bg-default-200 rounded-lg"></div>
          </Skeleton>

          {/* Skeleton for the submit button */}
          <Skeleton className="h-10 w-full rounded-lg bg-default-300">
            <div className="h-full w-full bg-default-300 rounded-lg"></div>
          </Skeleton>

          {/* Skeleton for the forgot password link */}
          <Skeleton className="h-5 w-1/3 rounded-lg bg-default-200 mt-4">
            <div className="h-full w-full bg-default-200 rounded-lg"></div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
