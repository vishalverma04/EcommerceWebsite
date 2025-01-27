import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  flatNo: {
    type: String,
    required: [true, 'Flat/House number is required']
  },
  street: {
    type: String,
    required: [true, 'Street/Area is required']
  },
  landmark: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  state: {
    type: String,
    required: [true, 'State is required']
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
  }
});

const serviceRequestSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User id is required']
  },
  serviceType: {
    type: String,
  },
  orderId: {
    type: String,
  },
  productName: {
    type: String,
    required: [true, 'Product name is required']
  },
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
  },
  address: {
    type: addressSchema,
    required: true
  },
  problem: {
    type: String,
    required: [true, 'Problem description is required'],
  },
  serialNumber: {
    type: String,
  },
  orderedDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved', 'Closed'],
    default: 'Pending'
  },
  resolvedAt:{
    type:Date
  },
  invoice: {
    type: String,
  },
}, {
  timestamps: true
});




const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

export default ServiceRequest;