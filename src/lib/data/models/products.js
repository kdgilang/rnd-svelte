import mongoose from 'mongoose';

export const productsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: {
      validator: (v) => {
        return /\S+/.test(v);
      },
      message: '{VALUE} is not a valid name.'
    }
  },
  images: {
    type: [String],
  },
  quantity: {
    type: Number,
    default: 0.0,
  },
  price: {
    type: Number,
    default: 0.0,
  },
  description: {
    type: String,
  },
  barcode: {
    type: String,
    default: '',
    // select: false
  },
  status: {
    type: Boolean,
    default: true
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

export const ProductsModel = mongoose.models.Products ?? mongoose.model('Products', productsSchema);