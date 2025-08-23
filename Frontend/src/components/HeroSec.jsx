import React from 'react'
import SelectionBar from './SelectionBar'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP);

const HeroSec = () => {

  const navigate = useNavigate();

  useGSAP (() =>
  {
    gsap.from('.SearchBar', 
      {
        opacity:0,
        x:-50,
      }
    )
  },[])

  const handleSearchWithParams = (params) => 
  {
    const query = new URLSearchParams(params).toString();
    navigate(`/cars?${query}`);
  };

  return (
    <section className='flex flex-col items-center h-full lg:h-screen bg-bg'>
        <div className='mt-5 md:mt-40 flex flex-col items-center'>
          <h1 className='max-w-4xl text-3xl md:text-5xl text-center text-neutral-700 font-semibold mx-2'>
            Explore the world's largest car sharing & rental marketplace
          </h1>
          <div className='SearchBar w-full'>
            <SelectionBar onSearch={handleSearchWithParams} />
          </div>
          <img src={assets.main_car} alt="MainCar" className='max-h-75 mt-10 lg:mt-20' />
        </div>
    </section>
  )
}

export default HeroSec