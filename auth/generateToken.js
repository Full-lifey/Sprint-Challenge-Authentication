const jwt = require('jsonwebtoken');

const secret = require('../config/secrets.js');

module.exports = function(user) {
  const jwtPayload = {
    subject: user.id,
    username: user.username
  };
  const jwtOptions = {
    expiresIn: '1d'
  };
  return jwt.sign(jwtPayload, secret.jwtSecret, jwtOptions);
};
