import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product',
      required: [true, 'Product ID is required'] 
    },
    quantity: { 
      type: Number, 
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'] 
    }
  });

  const paymentDetailsSchema = new mongoose.Schema({
    razorpay_order_id: { 
      type: String, 
      required: [true, 'Razorpay order ID is required'] 
    },
    razorpay_payment_id: { 
      type: String, 
      required: [true, 'Razorpay payment ID is required'] 
    },
    razorpay_signature: { 
      type: String, 
      required: [true, 'Razorpay signature is required'] 
    },
    paymentStatus: { 
      type: String, 
      required: [true, 'Payment status is required'],
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending' 
    },
    paymentDate: { 
      type: Date 
    }
  }); 

  const cancellationSchema = new mongoose.Schema({
    cancelledBy: { type: String, enum: ['customer', 'admin', 'system'], required: true },
    reason: { type: String, required: true },
    date: { type: Date, default: Date.now },
    refundStatus: { type: String, enum: ['pending', 'rejected','refunded'], default: 'pending' },
    refundedAt: { type: Date },
  });
  

  const orderSchema = new mongoose.Schema({
    userId: { 
      type:String,
      required: [true, 'User ID is required'] 
    },
    date: { 
      type: Date, 
      default: Date.now 
    },
    status: { 
      type: String, 
      required: [true, 'Order status is required'],
      enum: ['processing', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'processing' 
    },
    items: [{
        type: orderItemSchema,
    }],
    shippingAddress: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address', 
    },
    payment: { 
      type: paymentDetailsSchema, 
      required: [true, 'Payment details are required'] 
    },  
    // Price breakdown
    subtotal: { 
      type: Number, 
      required: [true, 'Subtotal is required'],
      min: [0, 'Subtotal cannot be negative'] 
    },
    shipping: { 
      type: Number, 
      required: [true, 'Shipping cost is required'],
      min: [0, 'Shipping cost cannot be negative'] 
    },
    total: { 
      type: Number, 
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount cannot be negative'] 
    },
  
    // Additional details
    estimatedDeliveryDate: { 
      type: Date 
    },
    deliveryInstructions: { 
      type: String 
    },
    cancellationDetails: { 
      type: cancellationSchema, 
      default: null 
    },
    deliveredAt: { 
      type: Date 
    }
  }, {
    timestamps: true // Adds createdAt and updatedAt automatically
  });
  

const Order = mongoose.model('Order', orderSchema);
export default Order;
