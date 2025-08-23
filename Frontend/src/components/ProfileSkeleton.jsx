import React from 'react'


const ProfileSkeletonLoading = () => {
  return (
    <div className="relative min-w-80 max-w-85 sm:w-85 rounded-xl shadow-lg bg-white pt-20 pb-4 animate-pulse">
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-300"></div>
      </div>

      <div className="flex flex-col gap-4 items-center px-4">
        <div className="h-6 w-32 bg-gray-300 rounded"></div>

        <div className="text-center w-full flex flex-col items-center gap-1">
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
          <div className="h-4 w-40 bg-gray-300 rounded"></div>
        </div>

        <div className="w-full flex items-end justify-between gap-3">
          <div className="w-full">
            <div className="h-4 w-16 bg-gray-300 rounded mb-1"></div>
            <div className="h-12 w-full bg-gray-300 rounded"></div>
          </div>

          <div className="h-12 w-20 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeletonLoading;