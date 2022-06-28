const router = require('express').Router();
const articleController = require('./article.controller');
const authenticationByJWT = require("../../auth/authenticate");

router.post('/', authenticationByJWT, (req, res, next) => {
  return articleController.create(req, res, next);
});

router.get('/:slug', (req, res, next) => {
  return articleController.getOne(req, res, next)
});

router.get('/', (req, res, next) => {
  return articleController.getAll(req, res, next)
});

router.delete('/:slug', authenticationByJWT, (req, res, next) => {
  return articleController.delete(req, res, next);
})

router.put('/:slug', authenticationByJWT, (req, res, next) => {
  return articleController.updateOne(req, res, next);
})

router.post('/favorite/:id', authenticationByJWT, (req, res, next) => {
  return articleController.favorite(req, res, next);
})

module.exports = router;
