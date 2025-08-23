import React, { useRef } from 'react'

import { CiSearch } from "react-icons/ci";


const SearchBar = () => {

    const searchQuery = useRef(); 

    const handleSearch = () =>
    {
        const value = searchQuery.current?.value;
        console.log(value);
    }
    const handleEnter = (e) =>
    {
        if(e.key !== 'Enter') return;
        const value = searchQuery.current?.value;
        console.log(value);
    }

  return (
    <div className='w-65 xl:w-80 h-10 xl:h-12 bg-white border-2 rounded-full border-neutral-300/60  text-neutral-400 flex items-center justify-between px-4'>
        <input ref={searchQuery} onKeyDown={handleEnter} type="text" placeholder='Search' className="flex-1 outline-none bg-transparent text-lg text-neutral-500 placeholder:text-neutral-400"
/>
        <CiSearch onClick={handleSearch}  className='text-4xl p-2 rounded-full hover:bg-neutral-300/40 transition-all duration-200 cursor-pointer'/>
    </div>
  )
}

export default SearchBar