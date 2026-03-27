import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from './jwtDecode.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('jrf_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('jrf_token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('jrf_token', token);
    }
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('jrf_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        logout();
      }
    } catch (err) {
      logout();
    }
  }, [token]);

  const login = (data) => {
    setUser(data.user);
    setToken(data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('jrf_user');
    localStorage.removeItem('jrf_token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
