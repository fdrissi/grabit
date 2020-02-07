const dotenv = require('dotenv');

dotenv.config();

const {
  NODE_ENV,
  FRONT_BASE_URL,
  PORT,
  SECRET_KEY,
  MONGO_URI,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_SECRET,
  FACEBOOK_CALLBACK_URL,
  PROFILE_IMAGES_PATH,
} = process.env;

module.exports = {
  env: NODE_ENV,
  frontUrl: FRONT_BASE_URL,
  port: PORT,
  secretKey: SECRET_KEY,
  mongoURI: MONGO_URI,
  facebookId: FACEBOOK_CLIENT_ID,
  facebookSecret: FACEBOOK_SECRET,
  facebookCallback: FACEBOOK_CALLBACK_URL,
  imagesPath: PROFILE_IMAGES_PATH,
};
