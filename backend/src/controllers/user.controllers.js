import { Apierror } from "../utils/Apierror.js";
import { asyncHander } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { redisClient } from "../config/redis.js";
import sendOtpEmail from "./email.controllers.js";

const registerUser= asyncHander(async (req,res)=>{
try {
    
         const {fullName,email,password,mobileNumber}=req.body
         
         if(
            [fullName,email,password,mobileNumber].some((field)=>{
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
    
        await redisClient.setEx(`otp:${email}`, otpExpiresAt, JSON.stringify({ otp, fullName, email, password,mobileNumber }));
    
        await sendOtpEmail(fullName,email, otp);
        
         return res.status(201).json(
            new ApiResponse(200, `OTP sent to your email ${email}`)
         )
} catch (error) {
    console.error('Error during signup:', error.message);
    res.status(error.statusCode).json({ message: error.message });
}

});

const loginUser=asyncHander(async (req,res)=>{
  
   const {email,password}=req.body
  
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

const isLoggedIn=asyncHander(async (req,res)=>{
  
  const decodedToken=req?.decodedToken;
  if(!decodedToken){
    throw new Apierror(401,"unauthorized request")
  }
   res.status(200).json(new ApiResponse(200,{decodedToken},"user is logged in"))

});
 
 const logoutUser=asyncHander(async (req,res)=>{
  
  const options={
    httpOnly:true,
    secure:true
 }
  
 res.status(200)
 .clearCookie("jwttoken",options)
 .json(new ApiResponse(200,{},"User logged Out"))
 
 })

export {registerUser,loginUser,logoutUser,isLoggedIn}