const splitToken = (JWT) => ({
  header: JWT.split('.')[0],
  payload: JWT.split('.')[1],
  signature: JWT.split('.')[2]
});

module.exports = splitToken;
