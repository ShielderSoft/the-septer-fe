import React, { createContext, useState, useContext, useEffect } from 'react';
import * as api from '../api/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('landing');

  // Load state from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('septer_user');
    const savedToken = localStorage.getItem('septer_token');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  const login = async (credentials) => {
    const data = await api.login(credentials);
    const userData = data.User;
    
    setUser(userData);
    setToken(data.access_token);
    
    // Save to localStorage
    localStorage.setItem('septer_user', JSON.stringify(userData));
    localStorage.setItem('septer_token', data.access_token);
    
    return data;
  };

  const guardianLogin = async (credentials) => {
    const data = await api.guardianLogin(credentials);
    const userData = { ...data.User, guardianAccess: true };
    
    setUser(userData);
    setToken(data.access_token);
    
    // Save to localStorage with guardian access flag
    localStorage.setItem('septer_user', JSON.stringify(userData));
    localStorage.setItem('septer_token', data.access_token);
    
    return data;
  };
  
  const updateUser = (updatedUser) => {
    const newUser = { ...user, ...updatedUser };
    setUser(newUser);
    localStorage.setItem('septer_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setPage('landing');
    
    // Clear localStorage
    localStorage.removeItem('septer_user');
    localStorage.removeItem('septer_token');
    
    // Redirect to home page on logout
    window.history.pushState({}, '', '/');
  };

  const navigateToLogin = () => setPage('login');
  const navigateToLanding = () => setPage('landing');

  const value = { 
    user, 
    token, 
    page, 
    login, 
    guardianLogin, 
    logout, 
    updateUser, 
    navigateToLogin, 
    navigateToLanding 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};