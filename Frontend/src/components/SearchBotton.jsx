import React, { useEffect, useState } from 'react'
import { FaArrowRight } from "react-icons/fa";

const SearchBotton = ({onClick}) => {
  const [windowSize, setWindowSize] = useState(false);
  useEffect(()=>
  {
    const handleWindow = ()=>
    {
      setWindowSize(window.innerWidth >= 540);
    }
    handleWindow();
    window.addEventListener('resize', handleWindow);
    return () => 
    {
      window.removeEventListener('resize',handleWindow);
    }
  },[])
  return (
    <button onClick={onClick} className={` ${windowSize?"group SearchBotton group-hover:border-borderColor":""}  rounded-full border-2 min-md:mr-4 border-primary bg-primary px-5 py-2.5 text-white text-lg flex items-center gap-4`}>
        <p className={`${windowSize?"group-hover:text-primary":""} transition-all duration-400`}>Search</p>
        <FaArrowRight className='text-white group-hover:text-primary rounded-full transition-all duration-400'  />
    </button>
  )
}

export default SearchBotton