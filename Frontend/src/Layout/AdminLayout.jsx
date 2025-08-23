import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from '../components/AdminSideBar'

const AdminLayout = () => {
    
  return (
    <div className="flex flex-row min-h-screen">
        <AdminSideBar className="hidden"/>
        <div className="flex-1">
            <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout