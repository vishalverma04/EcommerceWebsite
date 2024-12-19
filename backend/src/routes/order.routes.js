import express from 'express';
import {
    getAllOrders,
    updateOrderStatus,
    trackReturnsAndRefunds,
    getOrdersByFilter
} from '../controllers/order.controllers.js';

const router = express.Router();

// View all orders
router.get('/', getAllOrders);

// Update order status
router.put('/:id/status', updateOrderStatus);

// Track customer returns and refunds
router.get('/returns-refunds', trackReturnsAndRefunds);

router.get('/filter', getOrdersByFilter);


export default router;
