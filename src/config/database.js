const mongoose = require('mongoose');

const { mongoURI } = require('./config');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectToDatabase;
