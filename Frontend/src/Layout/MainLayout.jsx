import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/NavBar';

const MainLayout = () => {
  
  const location = useLocation();
  
  return (
    <>
    <Navbar/>
    {
        <div >
            <Outlet/>
        </div>
    }
    </>
  )
}

export default MainLayout