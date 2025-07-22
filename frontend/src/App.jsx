import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import GuardianLoginPage from './pages/GuardianLoginPage';
import HunterDashboard from './pages/HunterDashboard';
import GuardianDashboard from './pages/GuardianDashboard';

function App() {
  const { user, page } = useAuth();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Listen for URL changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update current path when it changes
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [window.location.pathname]);

  // Handle guardian-specific routes
  if (currentPath === '/g-login') {
    return user && user.role === 'Guardian' && user.guardianAccess ? <GuardianDashboard /> : <GuardianLoginPage />;
  }
  
  if (currentPath === '/g-dashboard') {
    return user && user.role === 'Guardian' && user.guardianAccess ? <GuardianDashboard /> : <GuardianLoginPage />;
  }

  // Handle regular routes
  if (user) {
    // If guardian logged in through regular login, they only get hunter dashboard
    return <HunterDashboard />;
  }

  switch (page) {
    case 'login':
      return <LoginPage />;
    case 'landing':
    default:
      return <LandingPage />;
  }
}

export default App;