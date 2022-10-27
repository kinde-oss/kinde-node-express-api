const {authToken, getPem} = require('@kinde-oss/kinde-node-auth-utils').default;

const kindeExpress = (domain) => {
  return async (req, res, next) => {
    try {
      const pem = await getPem(domain);

      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      if (token == null) {
        console.log('no token found');
        return res.sendStatus(401);
      }

      authToken(token, pem, (err, user) => {
        if (err) {
          console.log(err);
          return res.sendStatus(403);
        }
        const userObj = JSON.parse(user);
        if (userObj) {
          console.log('User found');
        }
        req.user = {id: userObj.sub};

        next();
      });
    } catch (err) {
      console.log(err);
    }
  };
};

module.exports = kindeExpress;
