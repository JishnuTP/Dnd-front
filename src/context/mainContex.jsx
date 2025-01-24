import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '../utils/api';

export const mainContext = createContext();

export const MainProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // Fetch user details from token
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/auth/userDetails`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUserDetails();
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser({});
    }
  }, [token]);

  
  return (
    <mainContext.Provider value={{ token, setToken,user,setUser }}>
      {children}
    </mainContext.Provider>
  );
};
