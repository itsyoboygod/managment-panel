import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRole }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');


    if (!token) return <Navigate to="/login" />;
    if (userRole !== allowedRole) return <Navigate to="/unauthorized" />;

    return <Outlet />
};

export default ProtectedRoute;