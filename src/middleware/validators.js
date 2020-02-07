const { check } = require('express-validator');

exports.updateUser = [
  check('name', 'Invalid Name').isAlpha(),
  check('email', 'Invalid Email').isEmail(),
  check('phone', 'Invalid Phone Number').isMobilePhone(),
];
