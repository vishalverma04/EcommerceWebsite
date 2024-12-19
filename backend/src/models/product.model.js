import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  },
  rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
  },
  comment: {
      type: String,
      trim: true,
  },
  createdAt: {
      type: Date,
      default: Date.now,
  },
});

const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    brand: {
      type: String,
      trim: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    warrantyInformation: {
      type: String,
      trim: true,
    },
    shippingInformation: {
      type: String,
      trim: true,
    },
    availabilityStatus: {
      type: String,
      default: 'In Stock',
      trim: true,
    },
    reviews: [reviewSchema],
    returnPolicy: {
      type: String,
      trim: true,
    },
    images: [
        {
      type: String,
      default:"https://via.placeholder.com/150"
    },
]
  });
  
const Product = mongoose.model('Product', productSchema);
export default Product;