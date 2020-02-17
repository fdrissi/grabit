const mongoose = require('mongoose');

const { Schema } = mongoose;


const customerSchema = new Schema({
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
  type: {
    type: String,
  },
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
