import React, { useRef } from 'react'
import Title from './Title'
import CarCard from './CarCard'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import { useQuery } from '@tanstack/react-query';
import SkeletonLoading from './CarSkeleton'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const FeaturesSec = () => {
  const navigate = useNavigate();
  const featuresRef = useRef();

  useGSAP(() => {
    gsap.from(".card", {
      opacity: 0,
      x: -40,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".card",
        start: "top 90%",
        toggleActions: "play none none none",
        scrub:true
      }
    });
  }, []);


  const { data: cars = [], isLoading, error } = useQuery({
    queryKey: ['featuredCars'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5007/car/allcars', 
        { method: "POST", headers: { "Content-Type": "application/json" },});
      if (!res.ok) throw new Error('Error fetching cars');
      const data = await res.json();
      return data.data.slice(0,3) || [];

    },
   refetchOnWindowFocus: false,}, 
  );


  return (
    <section className="flex flex-col items-center mt-30 px-6 md:px-16 lg:px-24 xl:px-32">
      <Title title={"Check out our marketplace"} subtitle={"Find your drive through our easy service"}/>
      <div
        ref={featuresRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {isLoading ? 
          (
            Array.from({length : 3}).map((_,index) => 
            (
              <SkeletonLoading key={index}/>
            ))
          ) 
          :
          cars?.length > 0 && 
          (
            cars.map((car, i) => (
              <div className="card" key={i}>
                <CarCard car={car} />
              </div>
            ))
          ) 
        }  
        
      </div>
      <button
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        className="flex items-center justify-center gap-2 py-2 px-5 border border-borderColor hover:bg-neutral-100 mt-18 cursor-pointer transition-all duration-150">
        Explore all cars <img src={assets.arrow_icon} alt="arrow" />
      </button>
    </section>
  );
};

export default FeaturesSec;
