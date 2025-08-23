import React from 'react'
import Title from './Title'
const SubscribeSec = () => {
  return (
    <div className='flex flex-col items-center gap-15 justify-center mt-30'>
        <Title title={"Never Miss A Deal!"} subtitle={"Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat."}/>
        <div className='flex justify-between text-sm md:text-lg border border-neutral-400/80 rounded-md lg:w-4xl '>
            <input type="email" id="" placeholder='Enter your email address' className='p-4 flex-1 outline-none ' />
            <button className='rounded-r-md py-4 px-8 bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-colors duration-150'>
                Subscribe Now
            </button>
        </div>
    </div>
  )
}

export default SubscribeSec