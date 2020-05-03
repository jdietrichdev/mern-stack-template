const jwt = require('jsonwebtoken');
const secret = 'supersecretsecret';

const withAuth = function(req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

  if(!token) {
    res.send('Invalid token');
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if(err) {
        res.send('Invalid token');
      } else {
        req.user = decoded.user;
        next();
      }
    });
  }
}

module.exports = withAuth;
