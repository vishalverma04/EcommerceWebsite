import { asyncHander } from '../utils/asyncHandler';
import Cart from '../models/cart.model'

const syncCart = asyncHander(async (req, res) => {
  const { userId, cart } = req.body;

  try {
    let existingCart = await Cart.findOne({ userId });

    if (existingCart) {
      // Update existing cart with products from localStorage
      existingCart.products = cart;
    } else {
      // Create a new cart if none exists
      existingCart = new Cart({ userId, products: cart });
    }

    await existingCart.save();
    res.status(200).json({ success: true, cart: existingCart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export { syncCart };

