import React, { useRef, useState } from 'react'
import { cityList } from '../assets/assets.js'
import SearchBotton from './SearchBotton'
import { useNavigate } from 'react-router-dom';

const SelectionBar = () => {
    const [pickUp, setPickUp] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const handleSearch = () =>
    {
        const params = {};
        if (location) params.location = location;
        if (pickUp) params.pickupDate = pickUp;
        if (returnDate) params.returnDate = returnDate;

        const query = new URLSearchParams(params).toString();
        navigate(`/cars?${query}`);
    }

    return (
        <div className='mx-2 flex flex-col md:flex-row items-start md:items-center justify-between max-md:gap-5 bg-white shadow-2xl p-5 rounded-lg md:rounded-full mt-10 lg:mt-20'>
            <div className='flex flex-col items-start gap-2 min-md:ml-5'>
                <select value={location} onChange={e => setLocation(e.target.value)} required className='outline-none' >
                    <option value="">Pickup Location</option>
                    {cityList.map((city,i)=> <option key={i} value={city}>{city}</option> )}
                </select>
                <p className='text-sm ml-1 text-gray-500'>Please select location</p>
            </div>
            <div className='h-0.5 w-10 md:h-10 md:w-0.5 bg-neutral-400/60'></div>
            <div className='flex flex-col items-start gap-2'>
                <label htmlFor="pickup-date">Pick-up Date</label>
                <input type="date" id='pickup-date' value={pickUp} onChange={e => setPickUp(e.target.value)} min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-500 outline-neutral-400/80'/>
            </div>
            <div className=' h-0.5 w-10 md:h-10 md:w-0.5 bg-neutral-400/60'></div>

            <div className='flex flex-col items-start gap-2'>
                <label htmlFor="retrun-date">Return Date</label>
                <input type="date" id='retrun-date' value={returnDate} onChange={e => setReturnDate(e.target.value)} min={pickUp ? pickUp : new Date().toISOString().split('T')[0]} className='text-sm text-gray-500 outline-neutral-400/80'/>
            </div>
            <SearchBotton onClick={handleSearch}/>
        </div>
    )
}

export default SelectionBar