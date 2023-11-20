import mongoose from 'mongoose';

const transactionsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  carts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carts'
  }],
  flip: {
    type: Object
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