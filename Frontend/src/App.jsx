import React from "react"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeMainPage from "./pages/HomePage";
import MainLayout from "./Layout/MainLayout";
import CarsPage from "./pages/CarsPage";
import CarDetails from "./pages/CarDetails";
import MyBookingPage from "./pages/MyBookingPage";
import Logout from "./pages/Logout";
import EditorLayout from "./Layout/EditorLayout";
import EditorCarList from "./components/EditorCarList";
import EditorMainPage from "./pages/EditorMainPage";
import EditorBookings from "./components/EditorBookingsList";
import AdminCarList from "./components/AdminCarList.";
import UsersList from "./components/UsersList";
import AdminLayout from "./Layout/AdminLayout";
import RequireRole from "./components/RequireRole";
import AdminMainPage from "./components/AdminMainPage";


const router = createBrowserRouter([
  {
    path:'/', element: <MainLayout />, 
    children: [
      {index : true, element: <HomeMainPage />},
      {path : "cars", element: <CarsPage />},
      {path : "mybookings", element: <MyBookingPage/>},
      {path : "car/:carId", element: <CarDetails/>},
      {path : "logout", element: <Logout/>},
    ]
  },
  {
    element: <RequireRole allowedRoles={[3000]}/>,
    children:
    [{
      path:'/editor', element: <EditorLayout/>,
      children:
      [
        {index : true, element: <EditorMainPage/>},
        {path : "car-list", element: <EditorCarList/>},
        {path : "bookings", element: <EditorBookings/>},

      ]
    }]
    
  },
  {
    element: <RequireRole allowedRoles={[4000]}/>,
    children:
    [{
      path:'/admin', element: <AdminLayout/>,
      children:
      [
        {index : true, element: <AdminMainPage/>},
        {path : "allcars", element: <AdminCarList/>},
        {path : "allusers", element: <UsersList/>},

      ]
    }]
    
  }
]) 
const App = () => 
{
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App 