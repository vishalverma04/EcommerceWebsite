import express from 'express';
import { syncCart } from '../controllers/cart.controllers.js';

const router = express.Router();

// Import controllers   
router.post('/cart/sync', syncCart);