const verifyToken = require('../verifyToken/verifyToken');
const decodeToken = require('../decodeToken/decodeToken');
const splitToken = require('../splitToken/splitToken');

const authToken = (JWT, pem, callback) => {
  const isTokenVerified = verifyToken(JWT, pem);
  if (!isTokenVerified) {
    return callback({name: 'JsonWebTokenError'});
  } else {
    const {payload} = splitToken(JWT);
    return callback(null, decodeToken(payload));
  }
};

module.exports = authToken;
