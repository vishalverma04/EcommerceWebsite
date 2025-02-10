import React, { createContext, useState, useContext } from 'react';
import Loader from '../pages/Loader';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading,setIsLoading]=useState(false)
  const [loggedInUser,setLoggedInUser]=useState({})
  

  const login = async (email, password,secret) => {
    setIsLoading(true)
    try {
      const {data} = await axios.post(`${SERVER_URL}/api/v1/admin/login`, {
        email,
        password,
        secret
      });
      
     

      if(data.success==true){
        setIsLoggedIn(true)
        setLoggedInUser(data.admin)
        localStorage.setItem('token',data.token)
        toast.success("Admin logged In successfully")
        return true;
    }
   } catch (error) {
    console.log(error)
      setIsLoggedIn(false)
      toast.error(error.response?.data?.message || "Something went wrong.");
      return false;
    }finally{
      setIsLoading(false)
      console.log(SERVER_URL)
      console.log("hii")
    } 
  };

  const checkIsLoggedIn = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return false;
      }
      const { data } = await axios.get(`${SERVER_URL}/api/v1/admin/isLoggedIn`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(data)
      if(data.success==true){
        setIsLoggedIn(true)
      }
    } catch (error) {
      setIsLoggedIn(false)
      console.error('An error occurred:', error);
      return false;
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  

  return (
    <AuthContext.Provider value={{ auth, login,isLoggedIn ,loggedInUser}}>
     {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
