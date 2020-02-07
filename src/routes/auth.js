const router = require('express').Router();
const passport = require('passport');

const {
  frontUrl,
} = require('../config/config');

// @route   Get /api/v1/auth/facebook
// @desc    Authenticated through Facebook Strategy
// @access  Public
router.get('/',
  passport.authenticate('facebook'));

// @route   Get /api/v1/auth/facebook/callback
// @desc    Facebook Strategy Callback Route
// @access  Public
router.get('/callback',
  passport.authenticate('facebook', {
    failureRedirect: `${frontUrl}/login`,
  }),
  (req, res) => {
    // Old user, redirect home.
    if (req.user.email) {
      return res.redirect(frontUrl);
    }
    // New user, redirect edit profile
    return res.redirect(`${frontUrl}/edit`);
  });

module.exports = router;
