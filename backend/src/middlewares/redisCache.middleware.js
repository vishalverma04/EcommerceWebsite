import { asyncHander } from "../utils/asyncHandler.js";
import { redisClient } from "../config/redis.js";

const cacheProducts = asyncHander(async (req, res, next) => {
 
  
  const cachedData = await redisClient.get("products_cache");

  if (cachedData) {
    return res.status(200).json({ products: JSON.parse(cachedData) });
}
  
  
  next();
});

export { cacheProducts };