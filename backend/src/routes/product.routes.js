import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js";
import { 
    addNewProduct,
    filterProducts,
    searchProducts,
    getSingleProduct,
    reviewProduct,
    getProducts,
    searchCategoryProduct
} from "../controllers/product.controllers.js";

import { cacheProducts } from "../middlewares/redisCache.middleware.js";

const router=Router()

router.route('/addNewProduct').post(
    upload.array("productImage"),
    addNewProduct
    )

router.get('/filter', filterProducts);
router.get('/search', searchProducts);
// router.get('/sort', sortProducts);
router.get('/getsingle/:id', getSingleProduct);
router.post('/:id/review',upload.array('images'), reviewProduct);
router.get('/getallproducts',cacheProducts,getProducts);
router.get('/category/:category',searchCategoryProduct);

export default router