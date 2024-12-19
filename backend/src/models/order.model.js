import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Canceled', 'Return Requested', 'Refunded'],
        default: 'Pending',
    },
    returnRequest: {
        isRequested: { type: Boolean, default: false },
        reason: { type: String, default: '' },
    },
    refund: {
        isRefunded: { type: Boolean, default: false },
        refundAmount: { type: Number, default: 0 },
    },
    
},{timestamps:true});

const Order = mongoose.model('Order', orderSchema);
export default Order;
