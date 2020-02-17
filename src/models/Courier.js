const mongoose = require('mongoose');

const { Schema } = mongoose;


const courierSchema = new Schema({
  facebookId: {
    type: String,
    required: true,
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
  },
  location: {
    type: {
      type: String,
    },
    coordinates: [],
  },
  reviews: {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
    },
    description: {
      type: String,
    },
  },
  active: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
  },
}, { autoIndex: false });

courierSchema.index({ location: '2dsphere' });

const Courier = mongoose.model('Courier', courierSchema);
module.exports = Courier;
