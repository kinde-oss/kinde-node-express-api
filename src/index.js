const {authToken, getPem} = require('@kinde-oss/kinde-node-auth-utils').default;

const kindeExpress = async (domain) => {
  const pem = await getPem(domain);

  return (req, res, next) => {
    const authHeader = req.headers.authorization;
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
