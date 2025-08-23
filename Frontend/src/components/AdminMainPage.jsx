import React, { useState, useEffect } from 'react';
import { FaCar, FaUsers, FaCheck } from 'react-icons/fa';
import useApplication from '../hooks/applicationHook';

const AdminMainPage = ({ adminName = "Admin" }) => {
    const { fetchWithToken } = useApplication();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

    useEffect(() => 
    {
        let intervalId;

        const fetchStats = async () => 
        {
            try 
            {
                const response = await fetchWithToken("http://localhost:5007/users/getAdminData", { method: "GET" });
                const data = await response.json();
                console.log("Backend data:", data); 

                setStats
                ([
                    { id: 1, title: "Total Cars", value: data.data.carsCount || 0, icon: <FaCar size={24} /> },
                    { id: 2, title: "Tasks Users", value: data.data.usersCount || 0, icon: <FaUsers size={24} /> },
                    { id: 3, title: "Total Approved Cars", value: data.data.ApprovedCarsCount || 0, icon: <FaCheck size={24} /> },
                ]);
            } 
            catch (error) 
            {
                console.error("Error fetching admin stats:", error);
            } 
            finally 
            {
                setLoading(false);
            }
        };

        fetchStats();
        intervalId = setInterval(fetchStats, 10000);

        return () => clearInterval(intervalId);
    }, []);


    if (loading) 
    {
        return <div className="p-8 text-center text-gray-500">Loading admin dashboard...</div>;
    }

    return (
        <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
        <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {greeting}, {adminName} 👋
            </h1>
            <p className="text-gray-600 text-lg">
                Here's an overview of your platform today.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
            <div key={stat.id} className="flex items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="p-4 bg-blue-100 text-blue-600 rounded-full mr-4">
                    {stat.icon}
                </div>
                <div>
                    <p className="text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};

export default AdminMainPage;
