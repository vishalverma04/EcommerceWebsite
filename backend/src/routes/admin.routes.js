import express from "express"
import {
    getTotalProductCount,
    getTotalUserCount,
    getAllProductsForAdmin,
    deleteProductById,
    updateProductById,
    addNewHeroSection,
    getAllOrdersForAdmin,
    updateOrderStatus,
    getOrderById,
    updateOrderEstDeliveryDate,
    getallusers,
    getAllServiceRequests,
    updateServiceStatus,
    updateRefundStatus,
    getSalesOverview,
    adminLogin,
    adminSignup,
    isAdminAuthenticated
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
router.get('/getallusers',getallusers)  // get all users

////////////// orders
router.get('/orders',getAllOrdersForAdmin)
router.put('/orders/:id/status',updateOrderStatus)
router.put('/orders/:id/estDeliveryDate',updateOrderEstDeliveryDate)
router.get('/orders/:id',getOrderById)
router.put('/orders/:id/refundStatus',updateRefundStatus)

////////////// others
router.post('/hero',upload.single("heroImage"),addNewHeroSection)

////////// service

router.get('/services',getAllServiceRequests)
router.put('/services/:id/status',updateServiceStatus)

/////////  sales data
router.get('/salesoverview',getSalesOverview)

///////// login
router.post('/login',adminLogin)
router.post('/signup',adminSignup)
router.get('/isLoggedIn',isAdminAuthenticated)





export default router