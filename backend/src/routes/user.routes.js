import express from 'express'
import {loginUser, logoutUser, registerUser} from '../controllers/user.controllers.js'
import verifyOtp from '../controllers/verifyOtp.controllers.js';

const router=express.Router();

router.route('/signup').post(registerUser)
router.route('/verifyotp').post(verifyOtp)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)

export default router