const { frontUrl } = require('../config/config');

module.exports = (req, res, next) => {
  if (req.isAuthenticated) {
    next();
  }
  res.redirect(frontUrl);
};
