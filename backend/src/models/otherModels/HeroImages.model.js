import mongoose from 'mongoose';

const heroImageSchema = new mongoose.Schema({
  image:{
    type:String,
    required:true
  }
});

const HeroImage = mongoose.model('HeroImage', heroImageSchema);
export default HeroImage;
