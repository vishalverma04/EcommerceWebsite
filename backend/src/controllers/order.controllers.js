import { asyncHander } from "../utils/asyncHandler";

import { Order } from "../models/order.model";

const getAllOrders = asyncHander(async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customerId', 'name email') // Populate customer details
            .populate('products.productId', 'title price') // Populate product details
            .sort({ createdAt: -1 }); // Sort by most recent

        res.status(200).json({
            message: "Orders retrieved successfully",
            orders,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving orders",
            error: error.message,
        });
    }
});

const updateOrderStatus = asyncHander(async (req, res) => {
    try {
        const { id } = req.params; // Order ID from URL
        const { status } = req.body; // New status from request body

        if (!['Pending', 'Shipped', 'Delivered', 'Canceled'].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            message: "Order status updated successfully",
            order: updatedOrder,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating order status",
            error: error.message,
        });
    }
});

const trackReturnsAndRefunds = asyncHander(async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [
                { 'returnRequest.isRequested': true },
                { 'refund.isRefunded': true },
            ],
        })
            .populate('customerId', 'name email')
            .populate('products.productId', 'title price');

        res.status(200).json({
            message: "Return and refund orders retrieved successfully",
            orders,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving return and refund orders",
            error: error.message,
        });
    }
});

const getOrdersByFilter=asyncHander(async(req,res)=>{
    try {
        const { status, customerId, startDate, endDate } = req.query;

        const filter = {};

        // Filter by status
        if (status && ['Pending', 'Shipped', 'Delivered', 'Canceled', 'Return Requested', 'Refunded'].includes(status)) {
            filter.status = status;
        }

        // Filter by customerId (optional)
        if (customerId) {
            filter.customerId = customerId;
        }

        // Filter by date range (optional)
        if (startDate || endDate) {
            const dateFilter = {};
            if (startDate) dateFilter.$gte = new Date(startDate);
            if (endDate) dateFilter.$lte = new Date(endDate);
            filter.createdAt = dateFilter;
        }

        // Query the database with the filters
        const orders = await Order.find(filter)
            .populate('customerId', 'name email') // Populate customer details
            .populate('products.productId', 'title price') // Populate product details
            .sort({ createdAt: -1 }); // Sort by most recent

        res.status(200).json({
            message: "Orders retrieved successfully",
            orders,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving orders by filter",
            error: error.message,
        });
    } 
});

export { getAllOrders, updateOrderStatus, trackReturnsAndRefunds, getOrdersByFilter };