import express from "express"
import {
    getTotalProductCount,
    getTotalUserCount,
    getAllProductsForAdmin,
    deleteProductById,
    updateProductById,
    addNewHeroSection
} from "../controllers/admin.controllers.js"
const router=express.Router()
import {upload} from "../middlewares/multer.middleware.js"

//////////// products
router.get('/productcount',getTotalProductCount)
router.get('/products',getAllProductsForAdmin)
router.delete('/product/:id',deleteProductById)
router.put('/product/:id',updateProductById)

////////////// users
router.get('/usercount',getTotalUserCount)


////////////// others
router.post('/hero',upload.single("heroImage"),addNewHeroSection)
export default router