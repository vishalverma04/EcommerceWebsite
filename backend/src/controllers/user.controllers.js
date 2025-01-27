import { Apierror } from "../utils/Apierror.js";
import { asyncHander } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { redisClient } from "../config/redis.js";
import sendOtpEmail from "./email.controllers.js";
import  Address  from "../models/address.model.js";
import  Order  from "../models/order.model.js";
import  ServiceRequest  from "../models/service.model.js";
import { OtpEmailMessage, forgetPasswordEmailMessage } from "../constants.js";
import jwt from "jsonwebtoken";
import transporter from "../config/email.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { uploadPdfOnCloudinary } from "../utils/cloudinary.js";

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
        
        
        const htmlcontent=OtpEmailMessage(fullName,otp);
        
        await sendOtpEmail(email,htmlcontent);
        
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
  
   try {
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
       email:user.email,
       userId:user._id,
       mobileNumber:user.mobileNumber,
       joinDate:user.createdAt.toISOString().split('T')[0]
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
   } catch (error) {
        res.status(error.statusCode).json({ message: error.message });
   }
 
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

 const forgotPassword=asyncHander(async (req,res)=>{
    const {email}=req.body;
    try{
    
    if(!email){
        throw new Apierror(400,"email is required")
    }
    const user=await User.findOne({email});
    if(!user){
        throw new Apierror(404,"user not found")
    }
    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m",
    });
    const resetLink = `${process.env.CLIENT_URL}/resetpassword/${token}`;

    const htmlContent = forgetPasswordEmailMessage(user.fullName, resetLink);

    await sendOtpEmail(email, htmlContent);

    res.status(200).json({ message: "Password reset link sent to your email" });
}
    catch (error) {
        console.error(error);
        res.status(500).json({ message:error.message });
      }

});

const resetPassword=asyncHander(async (req,res)=>{
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded._id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

        user.password = newPassword;
        await user.save();

  
      res.status(200).json({ message: "Password reset successfully." });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Invalid or expired token." });
    }
})


///////////////// address

const addNewAddress=asyncHander(async (req,res)=>{
   const { userId } = req.params;
   const {type, street, city, state, pincode,fullName,mobileNumber } = req.body;
   try {
       const user = await User.findById(userId);
       if (!user) {
           return res.status(404).json({ error: "User not found" });
       }
       const newAddress = new Address({
           type,
           street,
           city,
           state,
           pincode,
           fullName,
           mobileNumber,
       });

       const savedAddress = await newAddress.save();
       user.address.push(savedAddress._id);
       await user.save();

       res.status(201).json({
           message: "Address added successfully",
           address: savedAddress,
       });
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: "Failed to add address" });
   }
})

const deleteAddress=asyncHander(async (req,res)=>{
   const { userId, addressId } = req.params;

    try {
        // Validate user existence
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the address is associated with the user
        const addressIndex = user.address.indexOf(addressId);
        if (addressIndex === -1) {
            return res.status(404).json({ error: "Address not found for this user" });
        }

        // Remove the address from the user's address array
        user.address.splice(addressIndex, 1);
        await user.save();

        // Delete the address from the Address collection
        await Address.findByIdAndDelete(addressId);

        res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete address" });
    }
});

const getAllAddress=asyncHander(async (req,res)=>{
    const { userId } = req.params;
    try {
        // Validate user existence
        const user = await User.findById(userId).populate('address');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            message: "Addresses retrieved successfully",
            addresses: user.address,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve addresses" });
    }
})

///////////////  order

const getAllOrders=asyncHander(async (req,res)=>{
    try {
        const { userId } = req.params;
        if(!userId){
            return res.status(400).json({ error: "User ID is required" });
        }
        const order = await Order.find({ userId }).populate('shippingAddress').populate("items.productId");
        if(!order){
            return res.status(404).json({ error: "Order not found" });
        }
        res.status(200).json({
            message: "Orders retrieved successfully",
            orders: order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve orders" });
    }
});

const cancelOrder=asyncHander(async(req,res)=>{
    const { orderId } = req.params;
    const { cancelledBy, reason } = req.body;
  
    if (!reason) {
      return res.status(400).json({ message: 'Cancellation reason is required' });
    }
  
    try {
      // Find the order by ID
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Check if the order is already delivered or cancelled
      if (order.status === 'delivered') {
        return res.status(400).json({ message: 'Delivered orders cannot be cancelled' });
      }
      if (order.status === 'cancelled') {
        return res.status(400).json({ message: 'Order is already cancelled' });
      }
  
      // Update the order status and add cancellation details
      order.status = 'cancelled';
      order.cancellationDetails = {
        cancelledBy,
        reason,
        date: new Date(),
        refundStatus: 'pending', // Assume refund processing starts after cancellation
      };
  
      // Save the updated order
      await order.save();
  
      return res.status(200).json({ message: 'Order cancelled successfully', order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong', error });
    }
})


//////////////      service controllers

const addServiceRequest=asyncHander(async (req,res)=>{
    try {
    const { userId } = req.params;
    const { serviceType,
            orderId,
            productName,
            name, 
            mobileNumber, 
            flatNo, 
            street,
            city,
            state,
            pincode,
            landmark,
            problem, 
            serialNumber, 
            orderedDate, 
         } = req.body;
        const invoiceLocalPath = req.file?.path;
        let invoice = null;

        if(serviceType === 'warranty'){
            invoice = await uploadPdfOnCloudinary(invoiceLocalPath);

            if (!invoice) {
                return res.status(400).json({ error: "Failed to upload invoice" });
            }
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        const newServiceRequest = new ServiceRequest({
            userId,
            serviceType,
            orderId,
            productName,
            name,
            mobileNumber,
            address: {
                flatNo,
                street,
                city,
                state,
                pincode,
                landmark,
            },
            problem,
            serialNumber,
            orderedDate,
            invoice,
        });
        const savedServiceRequest = await newServiceRequest.save();
        user.serviceRequests.push(savedServiceRequest._id);
        await user.save();

        res.status(201).json({
            message: "Service request added successfully",
            serviceRequest: savedServiceRequest,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add service request" });
    }
})

const getServiceRequests=asyncHander(async (req,res)=>{
    try{
        const { userId } = req.params;
        if(!userId){
            return res.status(400).json({ error: "User ID is required" });
        }
        const user=await User.findById(userId).populate('serviceRequests');
        if(!user){
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
            message: "Service request retrieved successfully",
            success: true,
            serviceRequests: user.serviceRequests,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve service request" });
    }
});

///////////////        contact us
const getEmailFromUser=asyncHander(async (req,res)=>{
    const {name,email,subject,message}=req.body
    try{
        if(!name || !email || !subject || !message){
            throw new Apierror(400,"all fields are required")
        }

        const mailOptions = {
            from: process.env.EMAIL_AUTH,
            to: process.env.RECEIVER_EMAIL,
            replyTo: email,
            subject: subject,
            html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
    
          };
    
        await transporter.sendMail(mailOptions);

        const autoReplyMailOptions = {
            from: process.env.EMAIL_AUTH,
            to: email,
            subject: 'We have received your message',
            html: `
            <h3>Thank you for contacting us</h3>
            <p>We have received your message and will get back to you shortly.</p>
          `
        };

        await transporter.sendMail(autoReplyMailOptions);

        res.status(201).json({ message: "Email sent successfully" });
        
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Failed to send email" });
    }
})


export {
   registerUser,
   loginUser,
   logoutUser,
   isLoggedIn,
   addNewAddress,
   deleteAddress,
   getAllAddress,
   getAllOrders,
   addServiceRequest,
    getServiceRequests ,
    cancelOrder,
    forgotPassword,
    resetPassword,
    getEmailFromUser
}