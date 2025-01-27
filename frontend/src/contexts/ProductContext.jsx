import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Create Product Context
const ProductContext = createContext();
import toast from 'react-hot-toast';

// Product Provider Component
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]); // Filtered results
    const [filters, setFilters] = useState({
        category: "",
        sortPrice: "",
        minPrice: "",
        maxPrice: "",
        weight: "",
        brand: "",
    });
    const navigate = useNavigate();
    // Fetch products from the server
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("/api/v1/products/getallproducts"); // Replace with your API endpoint
            setProducts(response.data.products);
        } catch (err) {
            toast.error('Internal Server Error');
            setError(err.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    const searchProducts = async (searchQuery) => {
        setLoading(true);
        try {
            const {data} = await axios.get(`/api/v1/products/search?q=${searchQuery}`);
            setSearchResults(data.products || []);
            navigate(`/search/${searchQuery}`);
        } catch (error) {
            toast.error('Internal Server Error')
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let results = [...searchResults];
        // Filter by category
        if (filters.category) {
            results = results.filter((product) => product.category === filters.category);
        }

        // Filter by price range
        if (filters.minPrice) {
            results = results.filter((product) => product.price >= parseFloat(filters.minPrice));
        }
        if (filters.maxPrice) {
            results = results.filter((product) => product.price <= parseFloat(filters.maxPrice));
        }

        // Filter by weight
        if (filters.weight) {
            results = results.filter((product) => product.weight === parseFloat(filters.weight));
        }

        // Filter by brand
        if (filters.brand) {
            results = results.filter((product) => product.brand.toLowerCase().includes(filters.brand.toLowerCase()));
        }

        // Sort by price
        if (filters.sortPrice === "lowToHigh") {
            results.sort((a, b) => a.price - b.price);
        } else if (filters.sortPrice === "highToLow") {
            results.sort((a, b) => b.price - a.price);
        }

        setFilteredResults(results);
    };

    const searchCategoryProduct=async(category)=>{
        setLoading(true);
        try {
            const {data} = await axios.get(`/api/v1/products/category/${category}`);
            setSearchResults(data.products || []);
            navigate(`/search/${category}` ,{state:{category:category}});
        } catch (error) {
            toast.error('Internal Server Error');
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    }

    // Apply filters whenever filters or searchResults change
    useEffect(() => {
        applyFilters();
    }, [filters, searchResults]);
    
    useEffect(() => {
        fetchProducts();
    }, []);
    

    return (
        <ProductContext.Provider value={{ products, loading, error, fetchProducts, searchResults, searchProducts, filters, setFilters, filteredResults,searchCategoryProduct }}> 
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook to use the Product Context
export const useProductContext = () => useContext(ProductContext);
