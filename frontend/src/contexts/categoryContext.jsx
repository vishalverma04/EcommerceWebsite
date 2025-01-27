import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


const CategoryContext = createContext();
import toast from 'react-hot-toast';

// Product Provider Component
export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const {data} = await axios.get('/api/v1/settings/getcategories');
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
