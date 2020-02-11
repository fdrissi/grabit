const router = require('express').Router();
const { validationResult } = require('express-validator');
const Jimp = require('jimp');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);
const validator = require('../middleware/validators');
const isAuthenticated = require('../middleware/authentified');
const User = require('../models/userModel');
const { imagesPath } = require('../config/config');

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

// @route   Get api/v1/users/me
// @desc    Get Authenticated user info
// @access  Private
router.get('/me', isAuthenticated, (req, res) => {
  const { user } = req;
  res.json({ user });
});

// @route   Get api/v1/users/:id
// @desc    Get a user info by id
// @access  Private
router.get('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ id });
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
