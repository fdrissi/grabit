const mongoose = require('mongoose');

const { Schema } = mongoose;


const userSchema = new Schema({
  facebookId: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  location: {
    type: {
      type: String,
    },
    coordinates: [],
  },
  reviews: {
    // customer: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    // },
    // rating: {
    //   type: Number,
    // },
    // description: {
    //   type: String,
    // },
    type: Number,
    default: 0,
  },
  assignedOrders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
  }],
  assignedOrdersCount: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
  },
  password: {
    type: String,
  },
});

userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);
module.exports = User;
