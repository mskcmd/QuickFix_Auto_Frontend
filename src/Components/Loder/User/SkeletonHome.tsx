
export default function HeroSkeleton() {
  return (
    <div className="relative">
      {/* Header Skeleton */}
      <header className="bg-gray-100 p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo Skeleton */}
          <div className="w-32 h-8 bg-gray-300 rounded animate-pulse"></div>
          
          {/* Navigation Skeleton */}
          <div className="hidden sm:flex space-x-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="w-20 h-6 bg-gray-300 rounded animate-pulse"></div>
            ))}
          </div>

          {/* Mobile Menu Button Skeleton */}
          <div className="w-8 h-8 bg-gray-300 rounded sm:hidden animate-pulse"></div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gray-100 h-[calc(100vh-64px)] flex flex-col justify-center items-center p-4">
        {/* Title Skeleton */}
        <div className="w-3/4 h-12 bg-gray-300 rounded mb-4 animate-pulse"></div>

        {/* Subtitle Skeleton */}
        <div className="w-2/3 h-8 bg-gray-300 rounded mb-8 animate-pulse"></div>

        {/* Button Skeleton */}
        <div className="w-40 h-12 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}