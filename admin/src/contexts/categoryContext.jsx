import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CategoryContext = createContext();
import toast from 'react-hot-toast';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// Product Provider Component
export const ContextProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const {data} = await axios.get(`${SERVER_URL}/api/v1/settings/getcategories`);
            setCategories(data.categories || []);
        } catch (error) {
            toast.error('Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);
    

    return (
        <CategoryContext.Provider value={{ categories, fetchCategories, loading, setCategories }}> 
            {children}
        </CategoryContext.Provider>
    );
};

// Custom hook to use the Product Context
export const useCategoryContext = () => useContext(CategoryContext);
