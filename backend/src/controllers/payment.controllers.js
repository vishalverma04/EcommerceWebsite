import { razorpayInstance } from "../config/Razorpay.js";
import crypto from 'crypto';
import Order from "../models/order.model.js";
import { asyncHander } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";


const checkout=async(req,res)=>{
    // console.log(req.body.amount)
 try{
    const {
      amount,
      userId,
      shippingAddress,
      cart,

    }=req.body;
    

    const additems=async (cart)=>{
      let items=[]
     await cart.forEach(item=>{
          items.push({
              productId:item.productId,
              quantity:item.quantity,
          })
      })
      return items
  }
  const items=await additems(cart)

  const options={
    amount:req.body.amount*100,
    currency:"INR"

    }
const razorpayOrder =await razorpayInstance.orders.create(options);
if(!razorpayOrder){
    res.status(500).json({
        message:"something went wrong create Razorpay order"
    })
    return;
}

const order = new Order({
  userId, 
  items,
  shippingAddress,
  subtotal:amount,
  shipping:0,
  total:amount,
  estimatedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  payment: {
    razorpay_order_id: razorpayOrder.id,
    razorpay_payment_id: '...',
    razorpay_signature: '...',
    paymentStatus: 'pending'
},
  status: 'processing'
});
    await order.save();

    const user=await User.findById(userId)
    user.orders.push(order._id)
    await user.save()

        res.status(201).json({
            success: true,
            order: order,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount
        });

  } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }

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

    const order = await Order.findOne({
      'payment.razorpay_order_id': razorpay_order_id
  });

  if (!order) {
      return res.status(404).json({
          success: false,
          message: 'Order not found'
      });
  }

  // Update payment details
  order.payment.razorpay_payment_id = razorpay_payment_id;
  order.payment.razorpay_signature = razorpay_signature;
  order.payment.paymentStatus = 'completed';
  order.status = 'confirmed';
  order.payment.paymentDate = new Date();

  await order.save();
  res.redirect(
    `${process.env.CLIENT_URL}/payment/success?reference=${razorpay_payment_id}`
  );
  } else {
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message
  });
  }
}

export {checkout,paymentVerification}