const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
const {
  facebookId,
  facebookSecret,
  facebookCallback,
} = require('./config');

module.exports = (passport) => {
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
    profileFields: [
      'id',
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
      const user = await User.findOne({
        facebookId: profile.id,
      });

      if (user) {
        // User already registred
        return done(null, user);
      }
      // eslint-disable-next-line no-console
      console.log(userType, req.session, req.sessionStore.sessions);
      const newUser = new User({
        facebookId: profile.id,
        name: `${firstName} ${lastName}`,
        type: userType,
      });

      await newUser.save();
      delete req.session.userType;
      return done(null, newUser);
    } catch (error) {
      return done(error, false);
    }
  }));

  passport.use('local',
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    },
    (async (email, password, done) => {
      try {
        const user = await User.findOne({
          email,
        });

        if (!user) {
          return done('User not found', false);
        }

        if (user.password !== password) {
          return done('Wrong password', false);
        }
        return done(null, user);
      } catch (error) {
        done(error, false);
      }
    })));
};
