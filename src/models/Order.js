const mongoose = require('mongoose');

const MongoSchema = mongoose.Schema;


const orderSchema = new MongoSchema({
  customer: {
    type: MongoSchema.Types.ObjectId,
    ref: 'User',
  },
  deliveryMan: {
    type: MongoSchema.Types.ObjectId,
    ref: 'User',
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
  startAddressCoords: {
    type: {
      type: String,
    },
    coordinates: [],
  },
  deliveryAddress: {
    type: String,
  },
  deliveryAddressCoords: {
    type: {
      type: String,
    },
    coordinates: [],
  },
  cost: {
    type: Number,
  },
  estimatedTime: {
    type: Number,
  },
  acceptShare: {
    type: Boolean,
  },
  sharedOrder: {
    type: Boolean,
  },
  status: {
    type: String,
    default: 'Requested',
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
