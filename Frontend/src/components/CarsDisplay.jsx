import React, { useEffect } from 'react'
import CarCard from './CarCard'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import SkeletonLoading from './CarSkeleton'
import { useQuery } from '@tanstack/react-query';


const CarsDisplay = ({search="", priceRange=[0,1000]}) => {
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search)
  const locationParam = searchParams.get('location');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');
  const [count, setCount] = useState(6);
  const [allCars, setAllCars] = useState([]);

  const { data: cars = [], isLoading, error } = useQuery({
    queryKey: ['cars', locationParam || '', pickupDate || '', returnDate || '', search || '', priceRange || [0,1000], count],
    queryFn: async () => {
      let url = 'http://localhost:5007/car/allcars';
      const params = {};
      if (locationParam) params.location = locationParam;
      if (pickupDate) params.pickupDate = pickupDate;
      if (returnDate) params.returnDate = returnDate;
      const query = new URLSearchParams(params).toString();
      if (query) url += `?${query}`;

      const res = await fetch(url, 
        { method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ search, priceRange, count }),
        });
      if (!res.ok) throw new Error('Error fetching cars');
      const data = await res.json();
      console.log(data);
      return (data.data || []).filter(car => car != null);

    },
   refetchOnWindowFocus: false, }, 
  );

  useEffect(()=>
  {
    setAllCars([]);
    setCount(6);
  },[locationParam, pickupDate, returnDate, search, priceRange])

  useEffect(()=>
  {
    setAllCars(prev => {
      const merge = [...prev, ...cars];
      const unique = Array.from(new Map(merge.map(car => [car._id, car])).values());
      return unique;
    });
    
  },[cars])


  return (
    <section className='flex flex-col items-center  px-6 md:px-16 lg:px-24 xl:px-32'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
        {isLoading && allCars?.length === 0 ?
          (
            Array.from({length : 6}).map((_,index) => 
            (
              <SkeletonLoading key={index}/>
            ))
          ) 
          :
          (
            allCars.map((car)=>(
              <div key={car._id}>
                  <CarCard car={car}/>
              </div>
            ))
          ) 
        }  
        </div>
        {!isLoading && allCars?.length === 0 &&
          (
              <div className='w-full text-center text-2xl font-semibold'>No Cars Available</div>
          )
        }
        {error && <div className="text-red-500 mt-4">{error.message}</div>}  

        {cars?.length > 0 && 
          (
            <button onClick={() => setCount(prev => prev+6)} className={"py-3 px-4 bg-primary mt-20 text-white font-semibold hover:bg-primary/70 transition-colors duration-150 "}>Show More</button>
          )
        }
    </section>
  )
}

export default CarsDisplay