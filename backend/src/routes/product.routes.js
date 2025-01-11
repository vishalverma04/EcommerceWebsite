import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js";
import { 
    addNewProduct,
    filterProducts,
    searchProducts,
    getSingleProduct,
    reviewProduct,
    getProducts
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
router.get('/getOneProduct/:id', getSingleProduct);
router.post('/:id/review', reviewProduct);
router.get('/getallproducts',getProducts);




export default router