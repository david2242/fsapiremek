const jwt = require('jsonwebtoken');
const createError = require('http-errors');


module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    })
  } else {
   next(new createError.Forbidden("Invalid user authentication!"));
  }
}
