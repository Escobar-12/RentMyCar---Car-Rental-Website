import React, { useEffect, useState } from 'react'
import { assets } from "../assets/assets.js"
import { Link, NavLink } from 'react-router-dom'
import CustomButton from './CustomButton.jsx'
import SearchBar from './SearchBar.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Singup.jsx'
import useAuth from '../hooks/useAuth.jsx'
import UserProfile from './UserProfile.jsx'
import { FiMenu } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import useApplication from '../hooks/applicationHook.jsx'



const menuLinks = 
[
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "My Bookings", path: "/mybookings" },
]

const Navbar = () => {

  const {auth, error, loading} = useAuth();
  const {showModel, isMounted,isClosing,toggleModel} = useApplication();

  const [menuOpen, setMenuOpen] = useState(false);
  const [model, setModel] = useState(false); // false=login true=register
  


  const switchToRegister = () => 
  {
    setModel(true);
  };

  const switchTologin = () => 
  {
    setModel(false);
  };

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

    if(showModel) 
    {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("click", handleOutClick);

      return () =>
      {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("click", handleOutClick);
      }
    }
  },[showModel])

  useEffect(() => 
  {
    const handleCloseMenu = () => 
    {
      setMenuOpen(false);
    };
    
    window.addEventListener("resize", handleCloseMenu);
    return () => window.removeEventListener("resize", handleCloseMenu);
  }, []);


  useEffect(() => 
  {
    const preventScroll = (e) => e.preventDefault();

    if (showModel || menuOpen) 
    {
      document.body.addEventListener("wheel", preventScroll, { passive: false });
      document.body.addEventListener("touchmove", preventScroll, { passive: false });
    } 

    return () => 
    {
      document.body.removeEventListener("wheel", preventScroll, { passive: false });
      document.body.removeEventListener("touchmove", preventScroll, { passive: false });
    };
  }, [showModel, menuOpen]);

  return (
    <nav>
    <div className={` ${menuOpen && "max-md:sticky top-0"} h-20 px-5 md:px-10 py-4 border-b border-borderColor relative transition-all bg-white duration-300 z-20`}>
        <div className='flex h-full items-center justify-between xl:max-w-450 mx-auto'>
          <Link to={'/'} className='flex items-center '>
            <img src={assets.logo}  alt="Company Logo" className="object-contain w-20" />
            <p className='text-md md:text-2xl font-semibold'>RentMyCar</p>
          </Link>


          {/* Nav Links */}
          <div className={`max-xl:hidden border-borderColor flex-col lg:flex-row items-center max-lg:p-4 transition-all duration-300 z-50`}>
            {menuLinks.map((link, i)=>(
              <NavLink className={({isActive}) =>  { return `sm:mx-7 mx-10 rounded-md md:text-lg font-semibold ${isActive? "text-light":"text-neutral-500" }`}} to={link.path} key={i}>
                {link.name}
              </NavLink>
            ))}
          </div>
          <div className='flex items-center justify-between gap-7'>
            <div className='max-lg:hidden'>
              <SearchBar/>
            </div>
            {
              auth?.user && !error ?
              (
                <UserProfile menuOpen={menuOpen}/>
              )
              :
              (
                <div className='flex items-center justify-between space-x-4'>
                <CustomButton redirect={false} onClick={() => toggleModel()} Lable={"Sign In"}  className='max-md:hidden rounded-md text-center'/>
                </div>
              )
            }
            
            <FiMenu className='xl:hidden text-4xl cursor-pointer hover:bg-neutral-200 transition-all duration-200 rounded-full p-1' onClick={() => setMenuOpen(prev => !prev)}/>
          </div>
          </div>
      </div>

    {/* Mobile */}
    <div className={`xl:hidden ${menuOpen ? "max-xl:translate-x-0" :"max-xl:-translate-x-full"} fixed bg-white w-full h-screen transition-all duration-200 z-20`}>
        <div className='flex justify-center flex-col items-center mt-25 gap-10'>
          <div className='lg:hidden'>
            <SearchBar/>
          </div>
          { !auth?.user &&
            <div className='flex md:hidden items-center justify-between space-x-8 '>
              <CustomButton redirect={false} onClick={() => toggleModel()} Lable={"Sign In"} className='rounded-md '/>
            </div>
          }
          
          {menuLinks.map((link, i)=>(
            <NavLink onClick={() => setMenuOpen(false)} className={({isActive}) => { return ` mx-4 rounded-md md:text-lg font-semibold ${isActive? "text-light":"text-neutral-500" } `}} to={link.path} key={i}>
              {link.name}
            </NavLink>
          ))}
        </div>
    </div>
    

    {/* Modal */}
      {(showModel || isClosing) && (
        <div className={`out-bound fixed inset-0 flex items-center justify-center bg-black/50 z-50`}>
          <div className={`relative transition-all duration-300 ${isMounted && !isClosing ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            <MdCancel onClick={toggleModel} className='cursor-pointer text-4xl text-white absolute rounded-full -top-5 -right-5 '/>
             {model ? (
                <Register toLogin={switchTologin} Logged={toggleModel}/>
              ) : (
                <Login toRegister={switchToRegister} Logged={toggleModel}/>
              )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar