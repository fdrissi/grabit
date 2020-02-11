const mongoose = require('mongoose');

const MongoSchema = mongoose.Schema;


const orderSchema = new MongoSchema({
  customer: {
    type: MongoSchema.Types.ObjectId,
    ref: 'users',
  },
  deliveryMan: {
    type: MongoSchema.Types.ObjectId,
    ref: 'users',
  },
  description: {
    type: String,
  },
  orderItems: {
    type: [String],
  },
  asap: {
    type: Boolean,
    default: false,
  },
  deliveryDate: {
    type: Date,
  },
  startAddress: {
    type: String,
  },
  deliveryAddress: {
    type: String,
  },
  cost: {
    type: Number,
  },
});

const Order = mongoose.model('user', orderSchema);
module.exports = Order;
