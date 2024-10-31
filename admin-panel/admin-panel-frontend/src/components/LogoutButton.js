import React from 'react';

const LogoutButton = ({ onLogout }) => {
    return (
        <button onClick={onLogout} className="logout-button">
            Logout
        </button>
    );
};

export default LogoutButton;