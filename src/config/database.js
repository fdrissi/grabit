const mongoose = require('mongoose');

const { mongoURI } = require('./config');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Db connected"); //eslint-disable-line
  } catch (error) {
    // Exit process with failure
    console.log(error); //eslint-disable-line
    process.exit(1);
  }
};

module.exports = connectToDatabase;
