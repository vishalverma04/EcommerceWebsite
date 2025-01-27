import Product from '../models/product.model.js';
import { asyncHander } from '../utils/asyncHandler.js';
import { Apierror } from '../utils/Apierror.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { redisClient } from '../config/redis.js';

// add New Product
const addNewProduct=asyncHander(async(req,res)=>{
    try {
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
          links,
          material,
        } = req.body;
        //
        const link=JSON.parse(links)
        // console.log(link)
        // console.log(req.body) 
        
        
        if (!title || !category || price === undefined || stock === undefined || !weight) {
          return res.status(400).json({
            error: 'Please provide all required fields: title, category, price, stock, and weight.',
          });
        }

        let productImageLocalPaths=[]

        const productImages=req.files
        let images=[]
        if(productImages!=undefined){
          productImages.forEach(element => {
            productImageLocalPaths.push(element.path)
          });
          images=await uploadOnCloudinary(productImageLocalPaths)
        }
        
        const bulletPointsArray=bulletPoints.split(',')
        
        const newProduct = new Product({
          title,
          description,
          category,
          price,
          discountPercentage,
          rating,
          dimensions,
          bulletPoints:bulletPointsArray,
          stock,
          brand,
          weight,
          material,
          warrantyInformation,
          shippingInformation,
          availabilityStatus,
          reviews,
          returnPolicy,
          images,
          links:link,
        });

        const savedProduct = await newProduct.save();
        
        if(!savedProduct){
          throw new Apierror(500,"something went wrong while adding product")
        }
        
        res.status(200).json({
          statusCode:200,
          message: 'Product added successfully!',
          product: savedProduct,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({
          error: 'Internal Server Error',
          message: err.message,
        });
      }
    
});


// filter the product
const filterProducts = asyncHander(async (req, res) => {
  const { category, minPrice, maxPrice, brand, inStock, minRating } = req.query;

  const filters = {};

  if (category) filters.category = category;
  if (brand) filters.brand = brand;
  if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
  }
  if (inStock) filters.stock = { $gt: 0 }; // Products in stock
  if (minRating) filters.rating = { $gte: Number(minRating) };

  const products = await Product.find(filters);

  res.status(200).json({
      message: 'Filtered products retrieved successfully',
      products,
  });
});

// Search Products
const searchProducts = asyncHander(async (req, res) => {
  try {
    const query = req.query.q; // Get search term from query string
    // console.log(query)
    if (!query) {
      return res.status(400).send({ message: "Search query is required" });
    }

    const result = await Product.find({  
      $or: [
      { title: { $regex: query, $options: "i" } },
      // { description: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
      { brand: { $regex: query, $options: "i" } },
    ]
  });
    
  res.status(200).json({
    message: 'Product searched successfully!',
    products: result,
  });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// View Single Product
const getSingleProduct = asyncHander(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
      return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json({
      message: 'Product retrieved successfully',
      product,
  });
});

// review a product

const getProducts = asyncHander(async (req, res) => {
  try {
    const products = await Product.find({}).limit(50);
    await redisClient.set("products_cache", JSON.stringify(products), {
      EX: 3,
    });

    res.status(200).json({"statusCode":200,"message":"Products fetched successfully",products});
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

const searchCategoryProduct=asyncHander(async(req,res)=>{
  try{
    const { category } = req.params;
    const products = await Product.find({ category });
    
    res.status(200).json({
        message: 'Products retrieved successfully',
        products,
    });
  }catch(error){
    res.status(500).json({ error: "Failed to fetch products" });

  }
});

const reviewProduct=asyncHander(async(req,res)=>{
  try {
    const { id } = req.params; 
    const { userId, rating, comment,title,username} = req.body;

        const review={
          userId,
          rating,
          comment,
          title,
          username
        }  
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const totalReviews = product.reviews.length;
        const newRating = ((product.rating*totalReviews+Number(rating) ) / (totalReviews + 1)).toFixed(1);
        

        product.reviews.push(review);
        product.rating = newRating;
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
        message: "Review added successfully",
        product: updatedProduct,
    });
} catch (error) {
    res.status(500).json({
        message: "Error adding review",
        error: error.message,
    });
}
});

export {
  addNewProduct,
  filterProducts, 
  searchProducts,
  getSingleProduct,
  reviewProduct,
  getProducts,
  searchCategoryProduct,
};
