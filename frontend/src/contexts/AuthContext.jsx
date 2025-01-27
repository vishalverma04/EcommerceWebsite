import React, { createContext, useState, useContext } from 'react';
import Loader from '../pages/Loader';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading,setIsLoading]=useState(false)
  const [loggedInUser,setLoggedInUser]=useState({})
  const navigate=useNavigate()

  const login = async (email, password) => {
    try {
      const {data} = await axios.post('/api/v1/users/login', {
        email,
        password
      });
      const response=data.data;
      if (data.statusCode===200) {
        setAuth(response.jwttoken); // Save the token in state
        setIsLoggedIn(true)
        localStorage.setItem('authToken', response.jwttoken);
        localStorage.setItem('user',JSON.stringify(response.user))
        setLoggedInUser(response.user)
        localStorage.setItem("userId",response.user.userId)
        return true;
      } else {
        setIsLoggedIn(false)
        return false;
      }
    } catch (error) {
      setIsLoggedIn(false)
      toast.error(error.response?.data?.message || "Something went wrong.");
      return false;
    }
  };

  const checkIsLoggedIn = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return false;
      }
      const { data } = await axios.get('/api/v1/users/isLoggedIn', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (data.statusCode === 200) {
        setIsLoggedIn(true)
        setLoggedInUser(JSON.parse(localStorage.getItem('user')))
        return true;
      } else {
        localStorage.removeItem('authToken');
        setLoggedInUser({})
        localStorage.removeItem('userId')
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
    setIsLoggedIn(false)
    setLoggedInUser({})
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId')
    toast.success("Logged out successfully")
    navigate("/")
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout,isLoggedIn ,loggedInUser}}>
     {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
