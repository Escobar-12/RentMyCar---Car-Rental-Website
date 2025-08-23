import React,  { useState }  from 'react'

import { IoSearch } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { useQuery } from '@tanstack/react-query';

const CarSearchBar = ({getSearch, getPrice}) => {

  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [priceRange, setPriceRange] = useState([0,1000]);

  const handleSearch = (e)=>
  {
    if(e.key == "Enter")
    {
      getSearch(search);
    }
    setShowFilter(false);
    getPrice(priceRange);
  }
  const handleClearFilter = ()=>
  {
    setShowFilter(false);
    setPriceRange([0,1000]);
    getPrice([0,1000]);
  }
  const handlePriceChange = (index, value) => 
  {
    const newRange = [...priceRange];
    newRange[index] = Number(value);
    setPriceRange(newRange);
  }

  return (
    <div className='relative flex items-center gap-3 w-full max-w-3xl mx-5 p-2.5 bg-white rounded-full my-5 '>
        <IoSearch className='text-4xl text-neutral-600 cursor-pointer p-1.5 rounded-full hover:bg-neutral-200/80 transition-colors duration-150'/>
        <input type="text" onKeyDown={handleSearch} onChange={(e) => setSearch(e.target.value)} className='outline-none flex-1 text-neutral-500 font-semibold' placeholder='Search by make, model, name or features'/>
        <CiFilter onClick={() => setShowFilter(prev => !prev)} className='text-4xl text-neutral-600 cursor-pointer p-1.5 rounded-full hover:bg-neutral-200/80 transition-colors duration-150'/>
        {showFilter && 
          <div className='absolute top-full mt-2 right-0 bg-white p-4 rounded-lg shadow-lg w-64 z-10'>
            <h4 className='font-semibold mb-2'>Filter by Price</h4>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between items-center'>
                <span>${priceRange[0]}</span>
                <input type="range" min='0' max='1000' value={priceRange[0]} onChange={(e) => handlePriceChange(0, e.target.value)} className='w-fit mb-2' />
              </div>
              <div className='flex justify-between items-center'>
                <span>${priceRange[1]}</span>
                <input type="range" min='0' max='1000' value={priceRange[1]} onChange={(e) => handlePriceChange(1, e.target.value)} className='w-fit mb-2' />
              </div>
            </div>
            <button onClick={handleSearch} className='w-full p-2 bg-primary text-white mt-3 font-semibold hover:bg-primary/70 transition-all duration-150'>
              Filter
            </button>
            <button onClick={handleClearFilter} className='w-full p-2 bg-red-500 text-white mt-3 font-semibold hover:bg-red-500/70 transition-all duration-150'>
              Clear Filter
            </button>
          </div>
        }
    </div>
  )
}

export default CarSearchBar