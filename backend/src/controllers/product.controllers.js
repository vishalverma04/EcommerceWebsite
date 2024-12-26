import Product from '../models/product.model.js';
import { asyncHander } from '../utils/asyncHandler.js';
import { Apierror } from '../utils/Apierror.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';


// add New Product
const addNewProduct=asyncHander(async(req,res)=>{
    try {
        const {
          title,
          description,
          category,
          price,
          discountPercentage,
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
    console.log(title)
        
        if (!title || !category || price === undefined || stock === undefined || !weight) {
          return res.status(400).json({
            error: 'Please provide all required fields: title, category, price, stock, and weight.',
          });
        }
        let productImageLocalPaths=[]
        const productImages=req.files?.productImage
      
        let images=[]
        if(productImages!=undefined){
          productImages.forEach(element => {
            productImageLocalPaths.push(element.path)
          });
          images=await uploadOnCloudinary(productImageLocalPaths)
        }
        
       
        
        const newProduct = new Product({
          title,
          description,
          category,
          price,
          discountPercentage,
          rating,
          stock,
          brand,
          weight,
          warrantyInformation,
          shippingInformation,
          availabilityStatus,
          reviews,
          returnPolicy,
          images,
        });
    
        const savedProduct = await newProduct.save();
        
        if(!savedProduct){
          throw new Apierror(500,"something went wrong while adding product")
        }
        
        res.status(201).json({
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
    
})

//update product
const updateProductById=asyncHander(async(req,res)=>{
  try {
    const { id } = req.params; // Get product ID from URL
    let updates = req.body; // Fields to update from request body
  
    
    // Update product with given fields
    let productImageLocalPaths=[]
        const productImages=req.files?.productImage
      
        let images=[]
        if(productImages!=undefined){
          productImages.forEach(element => {
            productImageLocalPaths.push(element.path)
          });
          images=await uploadOnCloudinary(productImageLocalPaths)
        }
        if(images.length>0){
          updates.images=images
        }
   console.log(updates)
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true, runValidators: true } // Return updated document and validate fields
    );

    if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct
    });
} catch (error) {
    res.status(500).json({
        message: "Error updating product",
        error: error.message
    });
}
})

// delete product
const deleteProductById=asyncHander(async(req,res)=>{
  try {
    const { id } = req.params; // Get product ID from URL

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct
    });
} catch (error) {
    res.status(500).json({
        message: "Error deleting product",
        error: error.message
    });
}
})

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

    if (!query) {
      return res.status(400).send({ message: "Search query is required" });
    }

    const result = await Product.find({  
      $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
      { brand: { $regex: query, $options: "i" } },
    ]
  });
    
  res.status(200).json({
    message: 'Product searched successfully!',
    product: result,
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
const reviewProduct=asyncHander(async(req,res)=>{
  try {
    const { id } = req.params; // Product ID from URL
    const { userId, rating, comment } = req.body; // Review details from request body

    // Build the review object
    const review = {
        userId,
        rating,
        comment,
        createdAt: new Date(),
    };

    // Find the product and push the new review
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $push: { reviews: review } },
        { new: true, runValidators: true } // Return updated document and validate
    );

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
})




export {
  addNewProduct,
  filterProducts, 
  searchProducts,
  getSingleProduct,
  updateProductById,
  deleteProductById,
  reviewProduct
};
