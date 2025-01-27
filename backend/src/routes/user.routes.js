import express from 'express'
import {
    isLoggedIn,
    loginUser, 
    logoutUser, 
    registerUser,
    addNewAddress,
    deleteAddress,
    getAllAddress,
    getAllOrders,
    addServiceRequest,
    getServiceRequests,
    cancelOrder,
    forgotPassword,
    resetPassword,
    getEmailFromUser
} from '../controllers/user.controllers.js'
import verifyOtp from '../controllers/verifyOtp.controllers.js';
import { checkIsLoggedIn, verifyJWT } from '../middlewares/auth.middleware.js';
import  {upload} from '../middlewares/multer.middleware.js'

const router=express.Router();

router.route('/signup').post(registerUser)
router.route('/verifyotp').post(verifyOtp)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.get('/isLoggedIn',checkIsLoggedIn,isLoggedIn)
router.post('/:userId/address',addNewAddress)
router.delete('/:userId/address/:addressId',deleteAddress)
router.get('/:userId/addresses',getAllAddress)
router.get('/:userId/orders',getAllOrders)
router.post('/:userId/service',upload.single('invoice'),addServiceRequest)
router.get('/:userId/service',getServiceRequests)
router.post('/:orderId/cancelorder',cancelOrder)
router.post('/forgotpassword',forgotPassword)
router.post('/resetpassword/:token',resetPassword)
router.post('/emailfromuser',getEmailFromUser)




export default router