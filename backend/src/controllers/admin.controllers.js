import { asyncHander } from "../utils/asyncHandler.js";

import Product from '../models/product.model.js';
import {User} from '../models/user.model.js';
import HeroSection from '../models/otherModels/HeroImages.model.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//// products 
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

const deleteProductById= asyncHander(async(req,res)=>{
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ 
            message: 'Product deleted successfully', 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})

const updateProductById=asyncHander(async(req,res)=>{
    const { id } = req.params;
    const {
        title,
        description,
        category,
        price,
        discountPercentage,
        dimensions,
        bulletPoints,
        rating,
        stock,
        brand,
        weight,
        warrantyInformation,
        shippingInformation,
        availabilityStatus,
        reviews,
        returnPolicy,
      } = req.body;

    try {
        // Find the product by ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

    if (title) product.title = title;
    if (description) product.description = description;
    if (category) product.category = category;
    if (price) product.price = price;
    if (discountPercentage) product.discountPercentage = discountPercentage;
    if (dimensions) product.dimensions = dimensions;
    if (bulletPoints) product.bulletPoints = bulletPoints;
    if (rating) product.rating = rating;
    if (stock) product.stock = stock;
    if (brand) product.brand = brand;
    if (weight) product.weight = weight;
    if (warrantyInformation) product.warrantyInformation = warrantyInformation;
    if (shippingInformation) product.shippingInformation = shippingInformation;
    if (availabilityStatus) product.availabilityStatus = availabilityStatus;
    if (reviews) product.reviews = reviews;
    if (returnPolicy) product.returnPolicy = returnPolicy;

        const updatedProduct = await product.save();

        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})


/// users

const getTotalUserCount = asyncHander(async (req, res) => {
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


//////////////////////      others
const addNewHeroSection = asyncHander(async (req, res) => {
    try {
        if (req.file.path === undefined) {
          return res.status(400).json({ message: "Image is required!" });
        }

        const localfilepath = req.file.path;

        const images = await uploadOnCloudinary([localfilepath]);

        if (images===undefined) {
          return res.status(500).json({ message: "Failed to upload image" });
        }
    
        const hero = new HeroSection({
          image: images[0],
        });
    
        await hero.save();
        res.status(201).json({ message: "Hero section image uploaded", hero });
      } catch (error) {
        res.status(500).json({ message: "Failed to upload image", error });
      }

});




export { 
    getAllProductsForAdmin, 
    getTotalProductCount, 
    getTotalUserCount,
    deleteProductById,
    updateProductById,
    addNewHeroSection
    
 };