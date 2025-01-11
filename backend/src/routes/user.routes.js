import express from 'express'
import {
    isLoggedIn,
    loginUser, 
    logoutUser, 
    registerUser,
    addNewAddress,
    deleteAddress,
    getAllAddress
} from '../controllers/user.controllers.js'
import verifyOtp from '../controllers/verifyOtp.controllers.js';
import { checkIsLoggedIn, verifyJWT } from '../middlewares/auth.middleware.js';

const router=express.Router();

router.route('/signup').post(registerUser)
router.route('/verifyotp').post(verifyOtp)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.get('/isLoggedIn',checkIsLoggedIn,isLoggedIn)
router.post('/:userId/address',addNewAddress)
router.delete('/:userId/address/:addressId',deleteAddress)
router.get('/:userId/addresses',getAllAddress)


export default router