const jwt = require('jsonwebtoken');
const user = require('../models/user.model');
const createError = require('http-errors');

module.exports = (req, res, next) => {
  const {email, password} = req.body;
  user.findOne({email: email, password: password})
      .then(responseData => {
        if (responseData) {
          // console.log(responseData.toObject());
          const token = jwt.sign({
            email: responseData.email,
            username: responseData.username
          }, process.env.ACCESS_TOKEN_SECRET_KEY);
          res.json({...responseData.toObject(), accessToken: token});
        } else next(new createError.Forbidden("email or pw is incorrect"))
      })
      .catch(err => {
        console.error(err);
        res.json("email or pw is incorrect");
      });
}
