const authToken = require('./utils/authToken/authToken');
const jwkToPem = require('jwk-to-pem');
const axios = require('axios');

const kindeExpress = (domain) => {
  let pem;
  console.log(domain);
  const keyUrl = `https://${domain}/.well-known/jwks.json`;
  axios.get(keyUrl).then(({data}) => {
    if (data && data.keys) {
      const [firstKey] = data.keys;
      pem = jwkToPem(firstKey);
    } else {
      console.error(`ERROR: Unable to get keys from ${keyUrl}`);
    }
  });

  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    authToken(token, pem, (err, user) => {
      if (err) return res.sendStatus(403);
      const userObj = JSON.parse(user);
      req.user = {id: userObj.sub};

      next();
    });
  };
};

module.exports = kindeExpress;
