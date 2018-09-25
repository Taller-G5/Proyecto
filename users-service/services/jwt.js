const jwt = require('jsonwebtoken');
const config = require('../config/config')

function createToken(user) {
  var payload = {
    id:user.id,
    username: user.username,
    role:user.role,
  };
  return jwt.sign(payload, config.SECRET, { expiresIn: "14 days" });
}

function decodeToken(token) {
  let payload = {};
  jwt.verify(token, config.SECRET, (err, data) => {
    if (err) {
      payload = err.message;
    } else {
      payload = data;
    }
  });
  return payload;
}

module.exports = {
  createToken,
  decodeToken
};
