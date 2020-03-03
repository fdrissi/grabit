const router = require('express').Router();
const { validationResult } = require('express-validator');
const Jimp = require('jimp');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { promisify } = require('util');
const passport = require('passport');

const validator = require('../middleware/validators');
const isAuthenticated = require('../middleware/authentified');
const User = require('../models/User');
const { imagesPath } = require('../config/config');
const {
  frontUrl,
} = require('../config/config');
const usersFile = require('./users.json');

const unlinkAsync = promisify(fs.unlink);

// Configure storage for multer
const storage = multer.diskStorage({
  destination(req, file, callback) {
    const dir = imagesPath;
    fs.exists(dir, (exists) => {
      if (!exists) {
        return fs.mkdir(dir, (error) => callback(error, dir));
      }
      return callback(null, dir);
    });
  },
  filename(req, file, callback) {
    return callback(
      null,
      `IMAGE-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

// Set file size limit, and allowed extensions
const upload = multer({
  storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, callback) => {
    // allowed extensions
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimeType = fileTypes.test(file.mimetype);
    return extname && mimeType
      ? callback(null, true)
      : callback('Invalid Profile Image', false);
  },
});

// @route   Get api/v1/users/register/bulk
// @desc    Get Authenticated user info
// @access  Private
router.get('/register/bulk', async (req, res) => {
  const addresses = [
    {
      lat: 34.0016718,
      lng: -6.8465975,
    },
    {
      lat: 33.9799302,
      lng: -6.840459999999999,
    },
    {
      lat: 34.0066948,
      lng: -6.8206956,
    },
    {
      lat: 34.0219176,
      lng: -6.8404169,
    },
    {
      lat: 34.0038652,
      lng: -6.8448046,
    },
    {
      lat: 33.9994988,
      lng: -6.8496324,
    },
    {
      lat: 33.9933499,
      lng: -6.848500899999999,
    },
    {
      lat: 33.9559463,
      lng: -6.8726295,
    },
    {
      lat: 34.0162632,
      lng: -6.847830699999999,
    },
    {
      lat: 34.0240495,
      lng: -6.822654699999999,
    },
  ];

  let i = 0;
  usersFile.map(async (user) => {
    const index = Math.floor(Math.random() * 10);
    const address = addresses[index];

    const newUser = new User({
      name: user.name,
      email: user.email,
      reviews: user.reviews,
      location: {
        type: 'Point',
        coordinates: [address.lng, address.lat],
      },
      type: user.type,
      password: user.password,
    });

    if (user.type === 'driver' && i % 2 === 0) {
      newUser.assignedOrders.push(user.assignedOrders);
      newUser.assignedOrdersCount = 1;
    } else if (user.type === 'driver') {
      newUser.assignedOrdersCount = 0;
    }
    i += 1;
    await newUser.save();
  });

  res.json({ msg: '100 users registred successfuly!' });
});

// @route   Get api/v1/users/login
// @desc    Get Authenticated user info
// @access  Private
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => res.json({ msg: 'success' }));

// @route   Get api/v1/users/me
// @desc    Get Authenticated user info
// @access  Private
router.get('/me', isAuthenticated, (req, res) => {
  // eslint-disable-next-line no-console
  const { user } = req;
  res.json({ user });
});

// @route   Get api/v1/users/:id
// @desc    Get a user info by id
// @access  Private
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   Post api/v1/users/update
// @desc    Update User info
// @access  Private
router.put('/update',
  [isAuthenticated, validator.updateUser],
  async (req, res) => {
    // Validate Inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: 'Profile Not Updated', errors: errors.array() });
    }

    const { name, email, phone } = req.body;
    const userId = req.user.id;
    try {
      // Find user and update data
      const user = await User.findOne({ id: userId });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      user.name = name;
      user.email = email;
      user.phone = phone;
      await user.save();
      return res.json({ msg: 'User info updated successfuly' });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  });

// @route   POST api/users/image
// @desc    Upload profile image
// @access  Private
router.post('/image',
  [isAuthenticated, upload.single('profile_image')],
  async (req, res) => {
    const { path: fullPath, filename } = req.file;
    const { userId } = req.user;
    try {
      // Check if uploaded image is valid
      const image = await Jimp.read(fullPath);
      console.log(image) //eslint-disable-line
      // Add Validate height and width
      // Everything went fine.
      const user = await User.findOneAndUpdate(
        { id: userId },
        { profileImage: filename },
      );
      if (user) return res.json(filename);
      return res.status(404).json({ msg: 'User not Found' });
    } catch (error) {
      // Unvalid uploaded image
      await unlinkAsync(fullPath);
      return res.status(400).send({ msg: 'Invalid Profile Image' });
    }
  });

// @route   GET api/users/driver/near/:long/:lat
// @desc    Get near drivers to location
// @access  Private
router.get('/driver/near/:long/:lat', async (req, res) => {
  const { long, lat } = req.params;

  const filter = {
    location: {
      $near: {
        $maxDistance: 5000,
        $geometry: {
          type: 'Point',
          coordinates: [Number(long), Number(lat)],
        },
      },
    },
    available: true,
    assignedOrdersCount: { $gt: 0 },
    type: 'driver',
  };

  try {
    const users = await User.find(filter).sort({ assignedOrdersCount: 1, reviews: -1 }).populate('assignedOrders');

    if (users.length === 0) return res.status(404).json({ msg: 'No driver available' });

    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   Put api/v1/users/update/assignedOrders
// @desc    Update User info
// @access  Private
router.put('/update/assignedOrders', isAuthenticated, async (req, res) => {
  const { id: userId } = req.user;
  const { orderId } = req.body;

  try {
    // Find user and update data
    console.log("body", req.body)
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.assignedOrders.push(orderId);
    user.assignedOrdersCount += 1;
    await user.save();

    return res.json({ msg: 'User updated success', user });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
