import Product from '../models/product.model.js';
import { asyncHander } from '../utils/asyncHandler.js';
import { Apierror } from '../utils/Apierror.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

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
    
        
        if (!title || !category || price === undefined || stock === undefined || !weight) {
          return res.status(400).json({
            error: 'Please provide all required fields: title, category, price, stock, and weight.',
          });
        }
        let productImageLocalPaths=[]
        const productImages=req.files?.productImage
        console.log(productImages)
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



export {addNewProduct};
