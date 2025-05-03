
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page
    if (!localStorage.getItem('user')) {
      navigate('/auth/login');
      return;
    }
    navigate('/home');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to login page...</p>
    </div>
  );
};

export default Index;
