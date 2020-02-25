// const { frontUrl } = require('../config/config');

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    // eslint-disable-next-line no-console
    return next();
  }
  return res.status(401).json({ msg: 'Access denied' });
  // res.redirect(frontUrl);
};
