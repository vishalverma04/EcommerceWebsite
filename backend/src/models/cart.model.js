import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
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
      price: {
        type: Number,
        required: true, // Store the product price at the time of adding to the cart
      },
      total: {
        type: Number,
        required: true, // Derived field: quantity * price
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0, // Sum of all product totals
  },
  status: {
    type: String,
    enum: ['active', 'saved', 'checked-out'],
    default: 'active',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to calculate `totalPrice` and product totals before saving the cart
cartSchema.pre('save', function (next) {
  this.products.forEach((product) => {
    product.total = product.quantity * product.price;
  });
  this.totalPrice = this.products.reduce((acc, product) => acc + product.total, 0);
  this.updatedAt = Date.now();
  next();
});

// Static method to add a product to the cart
// cartSchema.statics.addToCart = async function (userId, productId, quantity, price) {
//   let cart = await this.findOne({ userId });

//   if (cart) {
//     const productIndex = cart.products.findIndex(
//       (item) => item.productId.toString() === productId
//     );

//     if (productIndex > -1) {
//       // Update quantity
//       cart.products[productIndex].quantity += quantity;
//     } else {
//       // Add new product
//       cart.products.push({ productId, quantity, price });
//     }
//   } else {
//     // Create a new cart
//     cart = await this.create({
//       userId,
//       products: [{ productId, quantity, price }],
//     });
//   }

//   return cart.save();
// };

// // Static method to remove a product from the cart
// cartSchema.statics.removeFromCart = async function (userId, productId) {
//   const cart = await this.findOne({ userId });
//   if (cart) {
//     cart.products = cart.products.filter(
//       (item) => item.productId.toString() !== productId
//     );
//     return cart.save();
//   }
//   return null;
// };

// // Static method to clear the cart
// cartSchema.statics.clearCart = async function (userId) {
//   const cart = await this.findOne({ userId });
//   if (cart) {
//     cart.products = [];
//     cart.totalPrice = 0;
//     return cart.save();
//   }
//   return null;
// };

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
