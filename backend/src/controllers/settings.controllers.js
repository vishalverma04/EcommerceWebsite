import { asyncHander } from "../utils/asyncHandler.js";
import  {uploadOnCloudinary}  from "../utils/cloudinary.js";
import {redisClient} from "../config/redis.js";

import  Category  from "../models/otherModels/category.model.js";
import  HeroImage  from "../models/otherModels/HeroImages.model.js";


////////////   HERO IMAGE  //////////////
const addNewHeroImage = asyncHander(async (req, res) => {
  try{
    
    let imageUrl=''
    const imageLocalPath=req.file?.path
    if(imageLocalPath!=undefined){
      imageUrl=await uploadOnCloudinary([imageLocalPath])
    }
    if(!imageUrl){
      res.status(400)
      throw new Error('Please fill all the fields')
    }
    const newHeroImage=new HeroImage({image:imageUrl[0]})
    await newHeroImage.save()

    await redisClient.del('heroimage_cache')
    
    res.status(201).json({message:'Hero Image added Succesfully',newHeroImage,success:true})

  }catch(error){
    console.log(error)
  }
});

const getHeroImages = asyncHander(async (req, res) => {
  try {
    const heroImages=await HeroImage.find()
    await redisClient.set('heroimage_cache',JSON.stringify(heroImages))
    res.status(200).json({heroImages,message:'Hero Images fetched successfully'})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});

const deleteHeroImage = asyncHander(async (req, res) => {
  try {
    const {id}=req.params
    const heroImage=await HeroImage.findByIdAndDelete(id)
    if(!heroImage){
      res.status(404)
      throw new Error('Hero Image not found')
    }
    await redisClient.del('heroimage_cache')
    res.status(200).json({message:'Hero Image deleted successfully',success:true})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});

///////////////  CATEGORY  /////////////////
const addNewCategory = asyncHander(async (req, res) => {
  try{
    const {name}=req.body
    let imageUrl=''
    const imageLocalPath=req.file?.path
    if(imageLocalPath!=undefined){
      imageUrl=await uploadOnCloudinary([imageLocalPath])
    }
    if(!name || !imageUrl){
      res.status(400)
      throw new Error('Please fill all the fields')
    }
    const newCategory=new Category({name,imageUrl:imageUrl[0]})
    await newCategory.save()

    await redisClient.del('category_cache')
    
    res.status(201).json({newCategory})

  }catch(error){
    console.log(error)
  }
});

const getCategories = asyncHander(async (req, res) => {
  try {
    const categories=await Category.find()
    await redisClient.set('category_cache',JSON.stringify(categories))
    res.status(200).json({categories,message:'Categories fetched successfully'})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});

const deleteCategory = asyncHander(async (req, res) => {
  try {
    const id=req.params.id
    const category=await Category.findByIdAndDelete(id)
    if(!category){
      res.status(404)
      throw new Error('Category not found')
    }
    await redisClient.del('category_cache')
    res.status(200).json({message:'Category deleted successfully',success:true})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});

const getCategoryCount=asyncHander(async(req,res)=>{
  try{
   const totalCategory=await Category.countDocuments()
   res.status(200).json({
    message: "Total Category count retrieved successfully",
    totalCategory,
});

  }catch(error){
    res.status(500).json({success:false,message:error.message})
  }
})


export {
  addNewHeroImage,
  getHeroImages,
  deleteHeroImage,
  addNewCategory,
  getCategories,
  deleteCategory,
  getCategoryCount
}