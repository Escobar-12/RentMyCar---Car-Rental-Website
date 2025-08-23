import React from 'react'
import { SiJaguar } from "react-icons/si";
import { SiHonda } from "react-icons/si";
import { SiDacia } from "react-icons/si";
import { SiToyota } from "react-icons/si";
import { SiFord } from "react-icons/si";
import { SiChevrolet } from "react-icons/si";

const BrandSec = () => {
  return (
    <div className='text-6xl text-neutral-500 mt-30 w-full flex flex-wrap items-center justify-center mx-2 gap-15 lg:gap-25'>
        <SiJaguar />
        <SiHonda />
        <SiDacia />
        <SiToyota />
        <SiFord />
        <SiChevrolet />
    </div>
  )
}

export default BrandSec