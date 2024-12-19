import dotenv from 'dotenv'

dotenv.config({path:"./.env"})
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
   
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (productImageLocalPaths) => {
    let uploadedImages = [];
    if (!productImageLocalPaths) return uploadedImages;
  
    for (let localfilepath of productImageLocalPaths) {
      try {
        if (!localfilepath) continue;
  
        // Check if the file exists
        if (!fs.existsSync(localfilepath)) {
          console.error(`File does not exist: ${localfilepath}`);
          continue;
        }
  
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(localfilepath, {
          resource_type: "auto", // You can specify "image" if files are always images
        });
  
        // Remove the temporary file
        fs.unlinkSync(localfilepath);
  
        // Push the uploaded image URL to the array
        uploadedImages.push(result.secure_url);
      } catch (error) {
        console.error(`Error uploading file: ${localfilepath}`);
        console.error(error);
  
        // Remove the temporary file even if the upload fails
        if (fs.existsSync(localfilepath)) {
          fs.unlinkSync(localfilepath);
        }
  
        throw new Error(`Error uploading image to Cloudinary: ${error.message}`);
      }
    }
  
    return uploadedImages;
  };

export {uploadOnCloudinary}