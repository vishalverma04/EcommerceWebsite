import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true,
        enum: ['home', 'office', 'other'],
        default: 'home',
    },
    street: {
        type: String,
        required: true,
        trim: true,
    },
    landmark:{
      type: String,
      trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        default:"India",
        trim: true,
    },
    pincode: {
        type: String,
        required: true,
        match: /^[0-9]{5,6}$/, 
    },
},{timestamps:true});
const Address=mongoose.model('Address',addressSchema)

export default Address;
