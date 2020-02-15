const FacebookStrategy = require('passport-facebook').Strategy;

const Customer = require('../models/Customer');
const Courier = require('../models/Courier');
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
    Customer.findById(id, (err, user) => {
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
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    const { userType } = req.session;
    const { _json: fullName } = profile;
    const { first_name: firstName, last_name: lastName } = fullName;
    try {
      const user = (userType === 'Customer')
        ? await Customer.findOne({
          facebookId: profile.id,
        })
        : await Courier.findOne({
          facebookId: profile.id,
        });

      if (user) {
        // User already registred
        return done(null, user);
      }
      const newUser = (userType === 'Customer')
        ? new Customer({
          facebookId: profile.id,
          name: `${firstName} ${lastName}`,
        })
        : new Courier({
          facebookId: profile.id,
          name: `${firstName} ${lastName}`,
        });

      await newUser.save();
      delete req.session.userType;
      return done(null, newUser);
    } catch (error) {
      return done(error, false);
    }
  }));
};

module.exports = facebookAuth;
