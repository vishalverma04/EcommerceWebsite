import { Apierror } from "../utils/Apierror.js";
import { asyncHander } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT=asyncHander(async(req,res,next)=>{
    try {
        const token=await req.cookies?.jwttoken || req.header("Authorization")?.replace("Bearer ","") || req.body
         
        if(!token){
            throw new Apierror(402,"unauthorized request")
        }
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user=await User.findById(decodedToken?._id).select("-password ")

        if(!user){
            throw new Apierror(401,"Invalid access Tokan")
        }

        req.user=user;
        next();

    } catch (error) {
        throw new Apierror(401,error?.message || "Inavlid access tokan")
    }
})

const checkIsLoggedIn=asyncHander(async(req,res,next)=>{
    try {
        const token=await req.cookies?.jwttoken || req.header("Authorization")?.replace("Bearer ","") || req.body
         
        if(!token){
            throw new Apierror(402,"unauthorized request")
        }
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        if(!decodedToken){
            throw new Apierror(401,"Invalid access Tokan")
        }

        req.decodedToken=decodedToken;
        next();

    } catch (error) {
        throw new Apierror(401,error?.message || "Inavlid access tokan")
    }
})

export {verifyJWT,checkIsLoggedIn}