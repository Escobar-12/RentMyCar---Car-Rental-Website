import React from 'react'
import Title from '../components/Title'
import CarSearchBar from '../components/CarSearchBar' 
import CarsDisplay from '../components/CarsDisplay'
import { useState } from 'react'

const CarsPage = () => {
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState([]);
  return (
    <>
      <div className='flex flex-col items-center w-full bg-bg py-20 px-2'>
        <Title title={"Never Miss A Deal!"} subtitle={"Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien."}/>
        <CarSearchBar getSearch={setSearch} getPrice={setPriceRange}/>
      </div>
      <div className='max-w-[1650px] lg:mt-20 mx-auto mb-20 lg:mb-40 px-4 md:px-8 lg:px-16 w-full flex flex-col justify-center items-center '>
        <CarsDisplay search={search} priceRange={priceRange}/>
      </div>
    </>
    
  )
}

export default CarsPage