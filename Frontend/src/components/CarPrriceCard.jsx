import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import useApplication from '../hooks/applicationHook'

const CarPrriceCard = ({car}) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { auth } = useAuth();
    const { fetchWithToken } = useApplication();

    const minStartDate = car.bookedTo
        ? new Date(new Date(car.bookedTo).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

    const minEndDate = startDate 
        ? new Date(new Date(startDate).getTime() + 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0]  
        : minStartDate;
    const isDisabled = !startDate || !endDate || new Date(startDate) > new Date(endDate);


    const bookCar = async () =>
    {   
        if (isDisabled) return;
        try
        {
            const res = await fetchWithToken('http://localhost:5007/booking/createBooking',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${auth?.Access_token}`,
                    },
                    credentials: "include",
                    body: JSON.stringify(
                    {
                        car: car._id,
                        pickupDate: startDate,
                        returnDate: endDate,
                    })
                }
            )
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Booking failed");
            setStartDate('');
            setEndDate('');
        }
        catch(err)
        {
            console.error(err);
        }
    }

 return (
    <div className="flex flex-col justify-center items-center space-y-10 px-5 lg:w-[450px] rounded-2xl shadow-2xl">
      <div className="space-y-4 w-full mt-5">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold">${car.pricePerDay}</p>
          <p className="text-neutral-400">per day</p>
        </div>
        <div className="h-0.5 w-full bg-neutral-300/70"></div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-600" htmlFor="startDate">Start Date</label>
        <input type="date" id="startDate" min={minStartDate} value={startDate} required
          onChange={(e) => setStartDate(e.target.value)}
          className="outline-none py-4 px-2 border-2 rounded-sm text-neutral-500 border-neutral-300"/>

        <label className="text-gray-600" htmlFor="endDate">End Date</label>
        <input type="date" id="endDate" min={minEndDate} value={endDate} required
          onChange={(e) => setEndDate(e.target.value)}
          className="outline-none py-4 px-2 border-2 rounded-sm text-neutral-500 border-neutral-300"/>
      </div>

      <button onClick={bookCar} disabled={isDisabled} className={`rounded-xl w-full py-2 font-bold text-lg text-white transition-colors duration-150 ${
          isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400 cursor-pointer'}`}>
        Book Now
      </button>

      <p className="text-gray-400 mb-5">No credit card required for reservation</p>
    </div>
  );
};

export default CarPrriceCard