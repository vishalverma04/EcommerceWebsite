import { razorpayInstance } from "../config/Razorpay.js";
import  {Payment}  from "../models/Payment.model.js";
import crypto from 'crypto';


const checkout=async(req,res)=>{
    // console.log(req.body.amount)

    const options={
    amount:req.body.amount*100,
    currency:"INR"
    }

const order=await razorpayInstance.orders.create(options);
if(!order){
    res.status(500).json({
        message:"something went wrong create order"
    })
    return;
}

res.status(200).json({
    success:true,
    order
})

}

const paymentVerification=async(req,res)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

    // console.log(req.body)
    const secret=process.env.RAZORPAY_API_SECRET
    // console.log(secret)

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
}

export {checkout,paymentVerification}