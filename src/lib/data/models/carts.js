import mongoose from 'mongoose';
import { productsSchema } from './products';

export const cartsSchema = mongoose.Schema({
  product: productsSchema,
  name: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  note: {
    type: String,
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

export const CartsModel = mongoose.models.Carts ?? mongoose.model('Carts', cartsSchema);