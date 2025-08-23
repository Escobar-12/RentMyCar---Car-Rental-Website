import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { assets } from '../assets/assets.js';
import useApplication from '../hooks/applicationHook';

import { PiUsersThreeBold } from "react-icons/pi";

const AdminSideBar = () => {

    const [openSideBar, setOpenSideBar] = useState(false);
    const navigate = useNavigate();
    const {useRole} = useApplication();

    const adminSidebarLinks = [
        {name:"", path: "/admin", icon: <FaHome/>},
        {name:"Cars List", path: "/admin/allcars", icon: <FaListAlt/>},
        {name:"Users", path: "/admin/allusers", icon: <PiUsersThreeBold/>},
        {name:"Logout", path: "/logout", icon: <FaSignOutAlt/>},
    ]

    
    return (
        <div className='lg:w-64 w-16 md:flex border-r h-screen sticky top-0 text-lg border-gray-300 pt-4 flex-col sm:gap-5 transition-all duration-300'>
            <Link to={'/'} className='flex items-center w-full cursor-pointer'>
                <img src={assets.logo}  alt="Company Logo" className="object-contain w-20" />
                <p className='text-md md:text-2xl font-semibold max-lg:hidden '>RentMyCar</p>
            </Link>
            
            {adminSidebarLinks.map((link, i) => (
                <NavLink to={link.path} key={i} end={link.path === "/admin"}
                    className={({ isActive }) =>`flex items-center py-5 sm:py-3 px-4 gap-3 ${
                        isActive
                            ? "border-r-4 md:border-r-[6px] bg-blue-400/10 border-blue-500 text-blue-500"
                            : "hover:bg-gray-100/90 border-white text-gray-700"
                        }`
                    }>
                    {link.icon}
                    <p className='lg:block hidden text-center'>{link.name}</p>
                </NavLink>
            ))
            }
        </div>
    )
}

export default AdminSideBar