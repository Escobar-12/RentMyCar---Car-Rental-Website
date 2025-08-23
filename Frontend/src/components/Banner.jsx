import React from 'react'
import { assets } from '../assets/assets.js'
import { FaCreditCard } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const Banner = () => {
  return (
    <div className='flex flex-row items-center justify-center flex-wrap mt-30 gap-4 px-8 min-md:pl-14 rounded-2xl  max-w-6xl xl:mx-auto mx-3 overflow-hidden'>
        <div className='w-xs h-[280px] text-center rounded-2xl p-2 bg-gradient-to-r from-[#b8dbf3] to-[#ecf6fc] flex flex-col items-center justify-center gap-4'>
          <div className='p-2 rounded-full bg-neutral-300/50'>
            <FaCreditCard className='text-2xl'/>
          </div>
          <h2 className='text-xl font-semibold'>No credit card needed</h2>
          <p className='text-sm text-neutral-500'>Tap the rent icon in RentMyCar app and complete your reservation. You can choose to pay in advance to save money.</p>
        </div>
        <div className='w-xs h-[280px] text-center rounded-2xl p-2 bg-gradient-to-r from-[#b3b4b45d] to-[#ebebeb73] flex flex-col items-center justify-center gap-4'>
          <div className='p-2 rounded-full bg-neutral-300/50'>
            <IoIosTimer className='text-2xl'/>
          </div>
          <h2 className='text-xl font-semibold'>Super fast check-In</h2>
          <p className='text-sm text-neutral-500'>Tap the rent icon in RentMyCar app and complete your reservation. You can choose to pay in advance to save money.</p>
        </div>
        <div className='w-xs h-[280px] text-center rounded-2xl p-2 bg-gradient-to-r from-[#f7e8c3] to-[#f6eedb9f] flex flex-col items-center justify-center gap-4'>
          <div className='p-2 rounded-full bg-neutral-300/50'>
            <FaRegMoneyBillAlt className='text-2xl'/>
          </div>
          <h2 className='text-xl font-semibold'>No extra costs on arrival</h2>
          <p className='text-sm text-neutral-500'>Tap the rent icon in RentMyCar app and complete your reservation. You can choose to pay in advance to save money.</p>
        </div>
    </div>
  )
}

export default Banner