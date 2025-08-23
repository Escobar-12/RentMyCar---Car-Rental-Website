import React from 'react'

import { GoPeople } from "react-icons/go";
import { MdOutlineLocalGasStation } from "react-icons/md";
import { LiaCarSideSolid } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";

const CarProps = ({car}) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 font-semibold text-lg mb-10 lg:mb-20'>
        <div className='rounded-xl h-30 bg-gray-200/50 flex flex-col justify-center items-center '>
            <GoPeople className='text-2xl text-neutral-500'/>
            <p>{car.seating_capacity} Seats</p>
        </div>
        <div className='rounded-xl h-30 bg-gray-200/50 flex flex-col justify-center items-center '>
            <MdOutlineLocalGasStation className='text-2xl text-neutral-500'/>
            <p>{car.fuel_type}</p>
        </div>
        <div className='rounded-xl h-30 bg-gray-200/50 flex flex-col justify-center items-center '>
            <LiaCarSideSolid className='text-2xl text-neutral-500'/>
            <p>{car.transmission}</p>
        </div>
        <div className='rounded-xl h-30 bg-gray-200/50 flex flex-col justify-center items-center '>
            <IoLocationOutline className='text-2xl text-neutral-500'/>
            <p>{car.location}</p>
        </div>
    </div>
  )
}

export default CarProps