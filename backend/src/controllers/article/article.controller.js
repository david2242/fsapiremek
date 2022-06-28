const createError = require('http-errors');
const articleService = require('./article.service');

exports.create = (req, res, next) => {
  const articleData = {
    title: req.body['title'],
    description: req.body['description'],
    body: req.body['body'],
    tagList: req.body['tagList'],
    author: req.user.username
  }

  return articleService.create(articleData)
      .then(createdArticle => {
        res.status(201);
        res.json(createdArticle);
      })
      .catch(err => next(new createError.InternalServerError(err.message)));
}

exports.getAll = (req, res, next) => {
  return articleService.getAll()
      .then(responseData => res.json(responseData))
      .catch(err => next(new createError.InternalServerError(err.message)))
}

exports.getOne = (req, res, next) => {
  const slug = req.params.slug;
  return articleService.getOne(slug)
      .then(responseData => res.json(responseData))
      .catch(err => next(new createError.InternalServerError(err.message)))
}

exports.delete = (req, res, next) => {
  return articleService.delete(req.params.slug)
      .then(responseData => res.json(responseData))
      .catch(err => next(new createError.InternalServerError(err.message)))
}

exports.updateOne = (req, res, next) => {
  return articleService.updateOne(req.params.slug, req.body)
      .then(responseData => res.json(responseData))
      .catch(err => next(new createError.InternalServerError(err.message)))
}

exports.favorite = (req, res, next) => {
  return articleService.favoriteOne(req.params.id)
      .then(responseData => res.json(responseData))
      .catch(err => next(new createError.InternalServerError(err.message)))
}
