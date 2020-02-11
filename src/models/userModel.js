const mongoose = require('mongoose');

const MongoSchema = mongoose.Schema;


const userSchema = new MongoSchema({
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
  userType: {
    type: String,
  },
});

const User = mongoose.model('user', userSchema);
module.exports = User;
