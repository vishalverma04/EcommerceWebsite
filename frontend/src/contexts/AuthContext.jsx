import React, { createContext, useState, useContext } from 'react';
import Loader from '../pages/Loader';
import { useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [fullName, setFullName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading,setIsLoading]=useState(false)

  const login = async (email, password) => {
    try {
      const {data} = await axios.post('http://localhost:4000/api/v1/users/login', {
        email,
        password
      });
      const response=data.data;
      if (data.statusCode===200) {
        setAuth(response.jwttoken); // Save the token in state
        setFullName(response.user.fullName); // Save the username
        setIsLoggedIn(true)
        localStorage.setItem('authToken', response.jwttoken);
        localStorage.setItem('userName', response.user.fullName);
        return true;
      } else {
        setIsLoggedIn(false)
        console.error('Login failed:', data.message);
        return false;
      }
    } catch (error) {
      setIsLoggedIn(false)
      console.error('An error occurred:', error);
      return false;
    }
  };

  const checkIsLoggedIn = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return false;
      }
      const { data } = await axios.get('http://localhost:4000/api/v1/users/isLoggedIn', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (data.statusCode === 200) {
        setIsLoggedIn(true)
        return true;
      } else {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        setIsLoggedIn(false)
        console.error('Login failed:', data.message);
        return false;
      }
    } catch (error) {
      setIsLoggedIn(false)
      console.error('An error occurred:', error);
      return false;
    }
  }

  useEffect(() => {
    setIsLoading(true);
    checkIsLoggedIn();
    setIsLoading(false);
  }, []);

  const logout = () => {
    setAuth(null);
    setUsername('');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, fullName,isLoggedIn }}>
     {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
