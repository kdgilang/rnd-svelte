import { Schema, model, models } from 'mongoose';

export const cartsSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Products'
  },
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

export const CartsModel = models.Carts ?? model('Carts', cartsSchema);