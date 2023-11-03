import mongoose from 'mongoose';

export const cartsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products'
  },
  name: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1
  },
  note: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true
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

export const CartsModel = mongoose.models.Carts ?? mongoose.model('Carts', cartsSchema);