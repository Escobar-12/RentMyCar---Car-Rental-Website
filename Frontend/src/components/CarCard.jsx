import React, { useRef } from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import Image from './Image'
import { useGSAP } from '@gsap/react'
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'

import { GoPeople } from "react-icons/go"
import { MdOutlineLocalGasStation } from "react-icons/md"
import { LiaCarSideSolid } from "react-icons/lia"
import { IoLocationOutline } from "react-icons/io5"

gsap.registerPlugin(useGSAP, ScrollToPlugin, ScrollTrigger);

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const cardRef = useRef();

  useGSAP(() => {
    gsap.from(cardRef.current, {
      opacity: 0.8,
      y: 20,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cardRef.current,
        toggleActions: "play none none none", 
        start:"top 95%",
        scrub:true
      }
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() => { navigate(`/car/${car._id}`); scrollTo(0,0) }}
      className="CarCard max-w-85 h-84 group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          path={car.image[0]}
          alt="car"
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />
        {car.isAvailable && (
          <p className="absolute top-4 left-4 bg-primary/90 text-white text-xs px-3 py-1 rounded-full">
            Available
          </p>
        )}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg ">
          <span className="font-semibold ">${car.pricePerDay}</span>
          <span className="text-white/80 text-sm"> / Day</span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col justify-between items-start">
        <div className="flex flex-col">
          <h4 className="text-lg font-medium ">{car.brand} {car.model}</h4>
          <p className="text-sm ">{car.category} • {car.year}</p>
        </div>
        
        <div className="mt-4 grid grid-cols-2 w-full gap-y-2 text-gray-500">
          <div className="flex items-center text-sm ">
            <GoPeople className="h-4 mr-2 text-2xl"/>
            <span>{car.seating_capacity}</span>
          </div>
          <div className="flex items-center text-sm ">
            <MdOutlineLocalGasStation className="h-4 mr-2 text-2xl"/>
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center text-sm ">
            <LiaCarSideSolid className="h-4 mr-2 text-2xl"/>
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center text-sm ">
            <IoLocationOutline className="h-4 mr-2 text-2xl"/>
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarCard
