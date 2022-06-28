const userService = require('./user.service');
const createError = require('http-errors');
const logger = require('../../utils/logger');

// CREATE
exports.create = (req, res, next) => {

  // saving data from request-body
  const newUser = {
    username: req.body["username"],
    email: req.body["email"],
    password: req.body["password"]
  }

  const userResponse = userService.create(newUser);
  return userResponse
      .then((userResponseData) => res.status(201).json(userResponseData))
      .catch(err => {
        logger.error(err);
        next(new createError.InternalServerError(err.message));
      })
}

exports.getAll = (req, res, next) => {
  const userResponse = userService.getAll();
  return userResponse
      .then( userResponseData => res.status(201).json(userResponseData))
      .catch( err => {
        logger.error(err);
        next(new createError.InternalServerError(err.message));
      })
}

// exports.getOne = (req, res, next) => {
//   const id = req.params.id;
//   const userResponse = userService.getOne(id);
//   return userResponse
//       .then( userResponseData => res.status(201).json(userResponseData))
//       .catch( err => {
//         logger.error(err);
//         next(new createError.InternalServerError(err));
//       })
// }

exports.getOneByEmail = (req, res, next) => {
  const email = req.params.email;
  return userService.getOneByEmail(email)
      .then( userResponseData => res.json(userResponseData))
      .catch( err => {
        logger.error(err);
        next(new createError.InternalServerError(err.message));
      })
}

exports.delete = (req, res, next) => {
  const email = req.params.email;
  const userResponse = userService.delete(email);
  return userResponse
      .then( userResponseData => res.status(201).json(userResponseData))
      .catch( err => {
        logger.error(err);
        next(new createError.InternalServerError(err.message));
      })
}

exports.update = (req, res, next) => {
  const email = req.params.email;

  const userUpdateData = {
    username: req.body["username"],
    email: req.body["email"],
    bio: req.body["bio"],
    imageRef: req.body["imageRef"]
  }

  const userResponse = userService.update(email, userUpdateData);
  return userResponse
      .then( (updatedUser) => res.json(updatedUser))
      .catch( err => {
        logger.error(err);
        next(new createError.InternalServerError(err.message));
      })
}
