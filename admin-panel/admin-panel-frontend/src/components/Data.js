import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (!token || userRole !== 'admin') {
        return <Navigate to="/home" />;
    }

    return children;
}

export default AdminRoute;