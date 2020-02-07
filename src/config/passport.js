const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/userModel');
const {
  facebookId,
  facebookSecret,
  facebookCallback,
} = require('./config');

const facebookAuth = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new FacebookStrategy({
    clientID: facebookId,
    clientSecret: facebookSecret,
    callbackURL: facebookCallback,
    profileFields: ['id',
      'first_name',
      'last_name',
    ],
  },
  async (accessToken, refreshToken, profile, done) => {
    const { _json: fullName } = profile;
    const { first_name: firstName, last_name: lastName } = fullName;
    try {
      const user = await User.findOne({
        facebookId: profile.id,
      });
      if (user) {
        return done(null, user);
      }
      const newUser = new User({
        facebookId: profile.id,
        name: `${firstName} ${lastName}`,
      });
      await newUser.save();
      return done(null, newUser);
    } catch (error) {
      return done(error, false);
    }
  }));
};

module.exports = facebookAuth;
