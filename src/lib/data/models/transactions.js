import mongoose from 'mongoose';
import { cartsSchema } from './carts';

const transactionsSchema = mongoose.Schema({
  carts: [cartsSchema],
  name: {
    type: String,
  },
  note: {
    type: String,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending' , 'Paid']
  },
  deliveryStatus: {
    type: String,
    enum: ['Pending', 'On the way', 'Arrived']
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

export const TransactionsModel = mongoose.models.Transactions ?? mongoose.model('Transactions', transactionsSchema);