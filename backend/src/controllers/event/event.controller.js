const eventService = require('./event.service');
const createError = require('http-errors');
const logger = require('../../utils/logger');

// CREATE
exports.create = (req, res, next) => {

  // saving data from request-body
  // const newUser = {
  //   username: req.body["username"],
  //   email: req.body["email"],
  //   password: req.body["password"]
  // }
  const newEvent = req.body;

  const eventResponse = eventService.create(newEvent);
  return eventResponse
      .then((eventResponseData) => res.status(201).json(eventResponseData))
      .catch(err => {
        logger.error(err);
        next(new createError.InternalServerError(err.message));
      })
}

exports.getAll = (req, res, next) => {
  const eventResponse = eventService.getAll();
  return eventResponse
      .then( eventResponseData => res.status(200).json(eventResponseData))
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

exports.getOneById = (req, res, next) => {
  const id = req.params.id;
  const eventResponse = eventService.getOne(id);
  return eventResponse
      .then( eventResponseData => res.status(200).json(eventResponseData))
      .catch( err => {
        logger.error(err);
        next(new createError.InternalServerError(err.message));
      })
}

exports.delete = (req, res, next) => {
  const id = req.params.id;
  const eventResponse = eventService.delete(id);
  return eventResponse
      .then( eventResponseData => res.status(200).json(eventResponseData))
      .catch( err => {
        logger.error(err);
        next(new createError.InternalServerError(err.message));
      })
}

exports.update = (req, res, next) => {
  const id = req.params.id;
  const eventUpdateData = req.body;

  const eventResponse = eventService.update(id, eventUpdateData);
  return eventResponse
      .then( updatedUser => res.json(updatedUser))
      .catch( err => {
        logger.error(err);
        next(new createError.InternalServerError(err.message));
      })
}
