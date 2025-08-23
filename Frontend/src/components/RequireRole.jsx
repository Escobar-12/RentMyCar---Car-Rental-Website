// components/RequireRole.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRole } from '../hooks/useRole';

const RequireRole = ({ allowedRoles }) => {
    const { data: role, refetch, isFetching, isError, error } = useRole();
    const location = useLocation();
    
    if (isFetching) return <p className="p-4">Checking permissions...</p>;
    if (isError) return <Navigate to="/" state={{ from: location }} replace />;

    return allowedRoles.includes(role)
        ? <Outlet />
        : <Navigate to="/" state={{ from: location }} replace />; 
};

export default RequireRole;
