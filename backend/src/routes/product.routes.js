import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js";
import { addNewProduct } from "../controllers/product.controllers.js";

const router=Router()

router.route('/addNewProduct').post(
    upload.fields([{name:'productImage' ,maxCount:8}]),
    addNewProduct
    )

export default router