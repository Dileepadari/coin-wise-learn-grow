import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the user data from localStorage
        localStorage.removeItem('user');

        // Redirect to the login page
        navigate('/auth/login');
    }, [navigate]);

    return null; // No UI needed for logout
};

export default Logout;