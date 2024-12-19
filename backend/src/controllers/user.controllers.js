import { Apierror } from "../utils/Apierror.js";
import { asyncHander } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { redisClient } from "../db/redis.js";
import sendOtpEmail from "./email.controllers.js";

const registerUser= asyncHander(async (req,res)=>{
try {
    
         const {fullName,email,password,mobileNumber,street,landmark,city,state,country,postalCode}=req.body
         if(
            [fullName,email,password,mobileNumber,street,landmark,city,state,country,postalCode].some((field)=>{
                 field === "";
            })
         ){
               throw new Apierror(400,"all entry are required")
         }
         const existedUser=await User.findOne({
            $or:[
                {mobileNumber},{email}
            ]
         })
         if(existedUser){
            throw new Apierror(409,"user already existed")
         }
    
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = 600; 
    
        await redisClient.setEx(`otp:${email}`, otpExpiresAt, JSON.stringify({ otp, fullName, email, password,mobileNumber,street,landmark,city,state,country,postalCode }));
    
        await sendOtpEmail(email, otp);
        
         return res.status(201).json(
            new ApiResponse(200, `OTP sent to your email ${email}`)
         )
} catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
}

});

const loginUser=asyncHander(async (req,res)=>{
  
   const {email,password}=req.body
   console.log(email,password)
  
   if(!email){
    throw new Apierror(400,"username or email required")
   }
   
   const user=await User.findOne({email})
   
   if(!user){
    throw new Apierror(404,"user does not exits")
   }
 
   const isPasswordValid=await user.isPasswordCorrect(password)
 
   if(!isPasswordValid){
    throw new Apierror(404,"invalid password")
   }
 
   const jwttoken = user.generateAccessToken();

   const loggedInUser={
      fullName:user.fullName,
      email:user.email
   }
 
    const options={
       httpOnly:true,
       secure:process.env.NODE_ENV === "production",
    }
    //send response
    res.status(200)
    .cookie("jwttoken",jwttoken,options)
    .json(
       new ApiResponse(200,{user:loggedInUser,jwttoken},"user succesfully logged in")
    )
 
 })
 
 const logoutUser=asyncHander(async (req,res)=>{
  
  const options={
    httpOnly:true,
    secure:true
 }
  
 res.status(200)
 .clearCookie("jwttoken",options)
 .json(new ApiResponse(200,{},"User logged Out"))
 
 })

export {registerUser,loginUser,logoutUser}