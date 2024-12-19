import { asyncHander } from "../utils/asyncHandler";

import Product from '../models/productModel.js';

const getAllProductsForAdmin = asyncHander(async (req, res) => {
    try {
        const { category, priceMin, priceMax, ratingMin, sortBy, page, limit } = req.query;

        // Base query
        let query = {};

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by price range
        if (priceMin || priceMax) {
            query.price = {};
            if (priceMin) query.price.$gte = parseFloat(priceMin);
            if (priceMax) query.price.$lte = parseFloat(priceMax);
        }

        // Filter by minimum rating
        if (ratingMin) {
            query.rating = { $gte: parseFloat(ratingMin) };
        }

        // Sorting options
        let sortOption = {};
        if (sortBy === 'priceAsc') {
            sortOption.price = 1; // Sort by price (ascending)
        } else if (sortBy === 'priceDesc') {
            sortOption.price = -1; // Sort by price (descending)
        } else if (sortBy === 'rating') {
            sortOption.rating = -1; // Sort by rating (highest first)
        } else if (sortBy === 'newest') {
            sortOption.createdAt = -1; // Sort by newest products first
        }

        // Pagination
        const itemsPerPage = limit ? parseInt(limit) : 12;
        const currentPage = page ? parseInt(page) : 1;

        // Fetch products from the database
        const products = await Product.find(query)
            .sort(sortOption)
            .skip((currentPage - 1) * itemsPerPage)
            .limit(itemsPerPage);

        // Count total products matching the query
        const totalProducts = await Product.countDocuments(query);

        res.status(200).json({
            message: "Products retrieved successfully",
            totalProducts,
            currentPage,
            totalPages: Math.ceil(totalProducts / itemsPerPage),
            products,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error: error.message,
        });
    }
});

const getTotalProductCount = asyncHander(async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();

        res.status(200).json({
            message: "Total product count retrieved successfully",
            totalProducts,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching product count",
            error: error.message,
        });
    }
});

import User from '../models/userModel.js';

export const getTotalUserCount = asyncHander(async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        res.status(200).json({
            message: "Total user count retrieved successfully",
            totalUsers,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user count",
            error: error.message,
        });
    }
});


