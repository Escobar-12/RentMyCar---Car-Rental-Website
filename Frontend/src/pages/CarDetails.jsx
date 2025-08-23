import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CarPrriceCard from '../components/CarPrriceCard';
import CarProps from '../components/CarProps';
import Image from '../components/Image';

import { FaArrowLeft } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import useApplication from '../hooks/applicationHook';


const CarDetails = () => {
  const {carId} = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const {fetchWithToken} = useApplication();
  const [loading, setLoading] = useState(true);

  const getCar = async () => {
    try {
      const res = await fetch(`http://localhost:5007/car/getcar/${carId}`, {
        method: "GET"
      });

      if (!res.ok) {
        console.error("Error while fetching car.");
        setCar(null);
        return;
      }

      const data = await res.json();
      setCar(data.data || null);
    } catch (error) {
      console.error("Fetch error:", error);
      setCar(null);
    } finally {
      setLoading(false);
    }
  };


    useEffect(()=>
    {
        getCar();
    },[carId])
    useEffect(()=>
    {
        console.log(car)
    },[car])
    
    if (loading) return <p>Loading...</p>
    if (!car) return <p>Car not found.</p>
    return (
    <div className='max-w-[1650px] mt-15 lg:mt-30 mx-auto mb-40 px-4 md:px-8 lg:px-16 w-full'>
        <button className='flex justify-between items-center gap-3 cursor-pointer font-semibold lg:text-xl text-neutral-400' onClick={()=> navigate(-1)}>
            <FaArrowLeft/>
            <p>Back to cars page</p>
        </button>

        <div className='flex flex-col xl:flex-row max-xl:mb-20 gap-10 mt-5 '>
            <Image isCarousel={true} paths={car.image} w={800} h={600} className="lg:flex-2/3 rounded-2xl max-h-150 w-full object-cover " alt={car.brand}/>
            <CarPrriceCard car={car}/>
        </div>
        
        <div className='flex flex-col gap-3 my-10 lg:my-20'>
          <h1 className='text-3xl lg:text-5xl font-semibold text-neutral-600'>{car.brand} {car.model}</h1>
          <p className='text-lg lg:text-xl text-neutral-400/80 font-semibold'>{car.year} • {car.category}</p>
        </div>
        <div className='h-0.5 w-full bg-neutral-400/30 my-10'></div>
        
        <CarProps car={car} />
        
        <div className='flex flex-col gap-3 mb-10 lg:mb-20'>
          <h3 className='font-semibold text-2xl '>Description</h3>
          <p className='text-lg lg:text-2xl text-neutral-400 tracking-tight '>{car.description}</p>
        </div>

        <div className='flex flex-col gap-3 mb-10 lg:mb-20'>
          <h3 className='font-semibold text-2xl '>Features</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            {car.features?.map((feature, i)=> (
              <div key={i} className='flex gap-2 items-center'>
                <IoMdCheckmarkCircleOutline className='text-blue-400 text-lg lg:text-2xl'/>
                <p className=' text-lg lg:text-2xl text-neutral-400 capitalize '>{feature}</p>
              </div>
            ))}
          </div>
        </div>  

    </div>
  )
}

export default CarDetails