import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js";
import { 
    addNewProduct,
    filterProducts,
    searchProducts,
    getSingleProduct,
    updateProductById,
    deleteProductById,
    reviewProduct
} from "../controllers/product.controllers.js";

const router=Router()

router.route('/addNewProduct').post(
    upload.fields([{name:'productImage' ,maxCount:8}]),
    addNewProduct
    )

router.get('/filter', filterProducts);
router.get('/search', searchProducts);
// router.get('/sort', sortProducts);
router.get('/:id', getSingleProduct);
router.route('/updateProduct/:id').post(
    upload.fields([{name:'productImage' ,maxCount:8}]),
    updateProductById
);

router.delete('/:id',deleteProductById)
router.post('/:id/review', reviewProduct);




export default router