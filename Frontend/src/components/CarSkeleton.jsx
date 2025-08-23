import React from 'react'


const SkeletonLoading = () => {
  return (
    <div className='w-70 md:w-85 h-84 group rounded-xl overflow-hidden shadow-lg cursor-pointer'>
        
        <div className='relative h-48 w-full overflow-hidden skeleton_loading '></div>

        <div className='p-4 sm:p-5 flex flex-col justify-between items-start'>
            <div className='flex flex-col'>
                <h4 className='text-lg font-medium w-20 h-5  skeleton_loading'></h4>
                <p className='text-sm '></p>
            </div>
            
            <div className='mt-4 grid grid-cols-1 w-full gap-y-2 text-gray-500'>
                <div className='flex items-center text-sm w-xxs h-5 skeleton_loading '></div>
                <div className='flex items-center text-sm w-xxs h-5 skeleton_loading '></div>
            </div>
        </div>
    </div>
  )
}

export default SkeletonLoading