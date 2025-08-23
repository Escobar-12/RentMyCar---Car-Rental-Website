import React from 'react'
import Title from '../components/Title'
import MyBookingCard from '../components/MyBookingCard'
import { useState } from 'react'
import { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import BookingCardSkeleton from '../components/BookingSkeleton'
import useApplication from '../hooks/applicationHook'

const EditorBookings = () => {

  const [myBookings, setMyBooking] = useState([]);
  const {token} = useAuth();
  const {fetchWithToken} = useApplication();

  const fetchMyBookings = async (populate) =>
  {
    try
    {
      const res = await fetchWithToken(`http://localhost:5007/booking/allEditorBookings?populate=${populate}`,
        {
          method:"GET",
        }
      );

      const data = await res.json();
      if (!res.ok) {
          throw new Error(data.message);
      }
      setMyBooking(data.myCarsBookings);
    }
    catch (error) { console.error(error); }
  }

  useEffect(()=>
  {
    fetchMyBookings(true);
  },[])

  return (
    <div className='max-w-[1650px] mt-15 lg:mt-30 mx-auto mb-40 px-4 md:px-8 lg:px-16 w-full'>
        <Title title={"My Bookings"} subtitle={"View and manage your car bookings"} align={"left"}/>
        <div className='mt-10 w-full max-sm:flex flex-col items-center'>
            
            { myBookings?.length > 0 ?

              (
                myBookings.map((booking) => (
                    <MyBookingCard key={booking._id} booking={booking}/>                    
                ))
              ):
              (
                Array.from({length : 6}).map((_, index)=>
                (
                  <BookingCardSkeleton/>
                ))
              )
            }
        </div>
    </div>
  )
}

export default EditorBookings