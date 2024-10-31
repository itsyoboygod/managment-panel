import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/styles/navbar.css';
import LogoutButton from './LogoutButton';

function NavBar({ onLogout, setToken }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const userRole = localStorage.getItem('userRole');
  const initial = username ? username.charAt(0).toUpperCase() : '';

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setToken(null);
    navigate('/login');
  };


  return (
    <header>
      <nav className="navbar">
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <label htmlFor="nav-toggle" className="nav-toggle-label" tabIndex="1">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <ul className="nav-menu">
          <li><Link className="navbar-link" to="/home">Home</Link></li>
          <li><Link className="navbar-link" to="/login">Login</Link></li>
          <li><Link className="navbar-link" to="/dashboard">Dashboard</Link></li>
          <li><Link className="navbar-link" to="/content">Content</Link></li>
          <li>{token && userRole === 'admin' && (<li><Link className="navbar-link" to="/users">Users</Link></li>)}</li>
          <li>{token && userRole === 'admin' && (<li><Link className="navbar-link" to="/upload">Upload</Link></li>)}</li>
          <li id="user-log" data-user-log={initial}> {token && (
            <li id="user-log" data-user-log={initial}>
              <div className="dropdown">
                <span className="user-initial" onClick={toggleDropdown}>
                  {initial}
                </span>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <LogoutButton onLogout={handleLogout} />
                  </div>
                )}
              </div>
            </li>
          )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;