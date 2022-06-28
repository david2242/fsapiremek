const express = require('express');
const router = express.Router();
const authenticationByJWT = require('.././../auth/authenticate');

const controller = require('./event.controller');

router.post('/', authenticationByJWT, (req, res, next) => controller.create(req, res, next));

router.get('/', (req, res, next) => controller.getAll(req, res, next));

// router.get('/:id', (req, res, next) => controller.getOne(req, res, next));
router.get('/:id', (req, res, next) => controller.getOneById(req, res, next));

router.put('/:id', authenticationByJWT, (req, res, next) => controller.update(req, res, next));

router.delete('/:id', authenticationByJWT, (req, res, next) => controller.delete(req, res, next));


module.exports = router;
