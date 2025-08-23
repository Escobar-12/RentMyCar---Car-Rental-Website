import React, { useEffect } from 'react'
import Title from '../components/Title'
import MyBookingCard from '../components/MyBookingCard'
import BookingCardSkeleton from '../components/BookingSkeleton'
import useApplication from '../hooks/applicationHook'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../hooks/useAuth'

const MyBookingPage = () => {

  const {fetchWithToken, toggleModel} = useApplication();
  const {auth} = useAuth();

  const {data:myBookings = [], isLoading, error} = useQuery(
    {
      queryKey:["myBookings"],
      queryFn: async () => {
          const res = await fetchWithToken(`http://localhost:5007/booking/myBookings?populate=${true}`,
            {
              method:"GET",
            }
          );

          const data = await res.json();
          if (!res.ok) {
              throw new Error(data.message);
          }
          return data.myBookings || [];
      },
      refetchOnWindowFocus: false
    }
  )

  useEffect(() =>
  {
    if(!auth?.user)
    {
      setTimeout(() =>
      {
        toggleModel(true);
      },500)
    }
  },[])

  return (
    <div className='max-w-[1650px] mt-15 lg:mt-30 mx-auto mb-40 px-4 md:px-8 lg:px-16 w-full'>
        <Title title={"My Bookings"} subtitle={"View and manage your car bookings"} align={"left"}/>
        <div className='mt-10 w-full'>
            {isLoading && myBookings?.length === 0 ?
              (
                Array.from({length : 6}).map((_, index)=>
                (
                  <BookingCardSkeleton key={index} />
                ))
              ) 
              :
              (
                myBookings.map((booking) => (
                    <MyBookingCard key={booking._id} booking={booking}/>                    
                ))
              )
            }

            { !isLoading && myBookings?.length === 0 &&
              (
                <div className='w-full text-center text-2xl font-semibold'>No Bookings Available</div>
              )
            }

            { auth?.user &&
              (error && <div className="text-red-500 mt-4">{error.message}</div>)
            }
        </div>
    </div>
  )
}

export default MyBookingPage