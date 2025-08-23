import React from 'react'
import Title from '../components/Title'
import { useState, useEffect } from 'react'
import useApplication from '../hooks/applicationHook'
import MyCarCard from './MyCarCard'
import { MdCancel } from "react-icons/md";
import SkeletonLoading from './CarSkeleton'
import AdminCarCard from './AdminCarCard'
const AdminCarList = () => {
  const {fetchWithToken} = useApplication();

  const [allCars, setAllCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const [isdeleting, setIsDeleting] = useState(false);
  
  const fetchAllCars = async () =>
  {
    try
    {
      const res = await fetchWithToken(`http://localhost:5007/car/allcarsadmin`,
        {
          method:"GET",
        }
      );

      const data = await res.json();
      if (!res.ok) {
          throw new Error(data.message);
      }
      setAllCars(data.data);
    }
    catch (error) { console.error(error.message); }
  }

    const DeleteCar = async () =>
    {
      try
      {
        const res = await fetchWithToken(`http://localhost:5007/car/deleteCar`,
          {
            method:"DELETE",
            headers:
            {
              "Content-Type":"application/json"
            },
            body: JSON.stringify(
            {
              carId:carToDelete
            })
          }
        );

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        setAllCars(data.cars);
      }
      catch (error) { console.error(error.message); }
    }

  const handleDeleteCar = async () =>
  {
    setIsDeleting(true);
    await DeleteCar();
    toggleModel();
    setIsDeleting(false);
    await fetchAllCars();
  }

  const toggleModel = () => 
  {
    if(showModal)
    {
      setIsClosing(true);
      setTimeout(() => {
        setShowModal(false);
        setIsClosing(false);
      }, 300);
    }
    else
    {
     setShowModal(true);
    }
  }

  useEffect(()=>
    {
      const handleKeyDown = (e) =>
      {
        if(e.key === "Escape") toggleModel();
      }
      const handleOutClick = (e) =>
      {
        if(e.target.classList.contains("out-bound")) toggleModel();
      }
  
      if(showModal) 
      {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("click", handleOutClick);
  
        return () =>
        {
          window.removeEventListener("keydown", handleKeyDown);
          window.removeEventListener("click", handleOutClick);
        }
      }
    },[showModal])
  
    useEffect(() => 
    {
      const preventScroll = (e) => e.preventDefault();
  
      if (showModal) 
      {
        document.body.addEventListener("wheel", preventScroll, { passive: false });
        document.body.addEventListener("touchmove", preventScroll, { passive: false });
      } 
  
      return () => 
      {
        document.body.removeEventListener("wheel", preventScroll, { passive: false });
        document.body.removeEventListener("touchmove", preventScroll, { passive: false });
      };
    }, [showModal]);

  useEffect(()=>
  {
    fetchAllCars();
  },[])

  return (
      <div className="mt-10 lg:mt-25 mb-40 px-4 md:px-8 lg:px-16 w-full">
        <Title title={"All Cars"} align={"left"}/>
          <div className="flex flex-wrap gap-8 mt-18 justify-center lg:justify-start">
            
            { allCars?.length > 0 ?
              (
                allCars.map((car) => (
                  <AdminCarCard key={car._id} car={car} setShowModal={setShowModal} setCarToDelete={setCarToDelete}/>                    
                ))
              ):
              (
                Array.from({length : 6}).map((_, index)=>
                (
                  <SkeletonLoading/>
                ))
              )
            }
        </div>

         {/* Modal */}
        {(showModal || isClosing) && (
          <div className=" out-bound fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className={`bg-white rounded-2xl p-6 shadow-lg max-w-md w-full ${!isClosing ? "opacity-100 scale-100" : "opacity-0 scale-90"} transition-all duration-300 `}>
              <MdCancel onClick={toggleModel} className='cursor-pointer text-4xl text-white absolute rounded-full -top-5 -right-5 '/>
              <h2 className="text-lg font-semibold mb-4">Delete this car?</h2>
              <p className="text-gray-600 mb-6">
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button onClick={toggleModel} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Cancel</button>
                <button onClick={() => handleDeleteCar()} disable={isdeleting} className={` ${isdeleting ? "cursor-not-allowed bg-red-300" : "cursor-pointer bg-red-500"} px-4 py-2 rounded-lg  text-white hover:bg-red-600`}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
  )
}

export default AdminCarList