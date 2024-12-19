import { User } from "../models/user.model.js";
import { redisClient } from "../db/redis.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { Apierror } from "../utils/Apierror.js";
import Address from "../models/address.model.js";

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const userData = await redisClient.get(`otp:${email}`);
    if (!userData) {
      return res.status(400).json({ message: 'OTP expired or invalid. Please request a new one.' });
    }

    const { otp: storedOtp, fullName, password ,mobileNumber,street,landmark,city,state,country,postalCode} = JSON.parse(userData);

    if (otp !== storedOtp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const address=await Address.create({
      street,landmark,city,state,country,postalCode
    })
    if(!address){
      throw new Apierror(500,"something went wrong while registering address")
    }
    const addressId=address._id;
    const user=await User.create({
        email,
        fullName,
        password,
        mobileNumber,
        address
    })
     if(!user){
      await Address.findByIdAndDelete(addressId);
        throw new Apierror(500,"something went wrong while registering the user")
     }
     
     await redisClient.del(`otp:${email}`);

     return res.status(201).json(
        new ApiResponse(200, user, "User registered Successfully")
     )
}
  
export default verifyOtp;