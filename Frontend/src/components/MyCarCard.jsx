import React, { useEffect, useState } from 'react';
import Image from './Image';
import { GoPeople } from "react-icons/go";
import { MdOutlineLocalGasStation } from "react-icons/md";
import { LiaCarSideSolid } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";
import ToggleSwitch from './ToggleSwitch';
import useAuth from '../hooks/useAuth';
import useApplication from '../hooks/applicationHook'

const MyCarCard = ({ car, setShowModal, setCarToDelete }) => {
    const [expanded, setExpanded] = useState(false);
    const [isAvailable, setIsAvailable] = useState(car.isAvailable);
    const {token} = useAuth();
    const {fetchWithToken} = useApplication();
    const [loading, setLoading] = useState(false);

    const setCarAvailable = async() =>
    {   
        if (!car.isApprouved || loading) return;
        setLoading(true);
        try
        {
            const res = await fetchWithToken(`http://localhost:5007/car/availableCar`,
                {
                method:"PUT",
                body: JSON.stringify({isAvailable:!isAvailable,carId:car._id}),
                headers: 
                    {
                        "Content-Type": "application/json"
                    },
                }
            );

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            setIsAvailable(!isAvailable);
        }
        catch (error) { console.error(error.message); }
        finally
        {
            setLoading(false);
        }
    }

    
    const handleRemove = () =>
    {
        setShowModal(true);
        setCarToDelete(car._id);
    }

    return (
        <div className={`max-w-85 sm:w-85 group rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 ${expanded ? "h-120" : "h-84"}`} >
            <div onClick={() => setExpanded(prev => !prev)}>
                <div className='relative h-48 overflow-hidden'>
                    <Image path={car.image[0]} alt="car" className='w-full h-full object-cover transition-all duration-500 group-hover:scale-105'   />
                    <p className={`absolute top-4 left-4 ${car.isApprouved ? "bg-green-400/90" :"bg-red-400/90" } text-white text-xs px-3 py-1 rounded-full`}>{car.isApprouved ? "Approuved" : "Not Approuved"}</p>
                    <div className='absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg '>
                        <span className='font-semibold '>${car.pricePerDay}</span>
                        <span className='text-white/80 text-sm'> / Day</span>
                    </div>
                </div>
                <div className='p-4 sm:p-5 flex flex-col justify-between items-start'>
                    <div className='flex flex-col'>
                        <h4 className='text-lg font-medium '>{car.brand} {car.model}</h4>
                        <p className='text-sm '>{car.category} • {car.year}</p>
                    </div>
                    
                    <div className='mt-4 grid grid-cols-2 w-full gap-y-2 text-gray-500'>
                        <div className='flex items-center text-sm '>
                            <GoPeople className='h-4 mr-2 text-2xl'/>
                            <span>{car.seating_capacity}</span>
                        </div>
                        <div className='flex items-center text-sm '>
                            <MdOutlineLocalGasStation className='h-4 mr-2 text-2xl'/>
                            <span>{car.fuel_type}</span>
                        </div>
                        <div className='flex items-center text-sm '>
                            <LiaCarSideSolid className='h-4 mr-2 text-2xl'/>
                            <span>{car.transmission}</span>
                        </div>
                        <div className='flex items-center text-sm '>
                            <IoLocationOutline className='h-4 mr-2 text-2xl'/>
                            <span>{car.location}</span>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='mt-5 px-4 sm:px-5 w-full flex items-center gap-4'>
                <ToggleSwitch checked={isAvailable} disabled={!car.isApprouved || loading} onChange={() => setCarAvailable()} />
                <p className='font-semibold text-lg'>Car Available</p>
            </div>
            <div className='mt-5 px-4 sm:px-5 w-full flex justify-end items-center gap-4'>
                <div onClick={() => handleRemove()} className='p-3 bg-red-400/80 text-white text-lg font-semibold rounded-lg hover:bg-red-500 hover:text-xl transition-all duration-200'>Remove</div>
                <div className='p-3 bg-green-400/80 text-white text-lg font-semibold rounded-lg hover:bg-green-500 hover:text-xl transition-all duration-200'>Edit</div>
            </div>
        </div>
    );
};

export default MyCarCard;
