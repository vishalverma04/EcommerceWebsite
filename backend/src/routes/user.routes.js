import express from 'express'
import {isLoggedIn, loginUser, logoutUser, registerUser} from '../controllers/user.controllers.js'
import verifyOtp from '../controllers/verifyOtp.controllers.js';
import { checkIsLoggedIn, verifyJWT } from '../middlewares/auth.middleware.js';

const router=express.Router();

router.route('/signup').post(registerUser)
router.route('/verifyotp').post(verifyOtp)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.get('/isLoggedIn',checkIsLoggedIn,isLoggedIn)

export default router