import { asyncHander } from "../utils/asyncHandler.js";
import { redisClient } from "../config/redis.js";

const cacheProducts = asyncHander(async (req, res, next) => {
  try {
    // const cachedData = await redisClient.get("products_cache");
  
    if (cachedData) {
      return res.status(200).json({ products: JSON.parse(cachedData) });
  }
    
    
    next();
  } catch (error) {
    next();
  }
});

const cacheCategory = asyncHander(async (req, res, next) => {
  try {
    const cachedData = await redisClient.get("category_cache");
  
    if (cachedData) {
      return res.status(200).json({ categories: JSON.parse(cachedData) });
  } 
    next();
  } catch (error) {
    next();
    
  }
});

const cacheHeroImages=asyncHander(async(req,res,next)=>{
  try {
    const cachedData = await redisClient.get("heroimage_cache");
  
    if (cachedData) {
      return res.status(200).json({ heroImages: JSON.parse(cachedData) });
  } 
    next();
  } catch (error) {
    next();
    
  }
})

export { cacheProducts , cacheCategory ,cacheHeroImages};