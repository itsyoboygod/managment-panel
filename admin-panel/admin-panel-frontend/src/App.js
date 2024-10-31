import Home from './components/Home';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Content from './components/Content';
import Register from './components/Register';
import React, { useState } from 'react';
import ProtectedRoute from './ProtectedRoute';
import Data from './components/Data';
import Upload from './components/Upload';
import AdminRoute from './components/AdminRoute';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    <Router>
      <NavBar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/users" element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="" element={<Users />} />
        </Route>
        <Route path="/content" element={<Content />} />
        <Route path="/data" element={<AdminRoute> <Data /> </AdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;