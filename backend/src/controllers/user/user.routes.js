const express = require('express');
const router = express.Router();
const authenticationByJWT = require("../../auth/authenticate");

const controller = require('./user.controller');

router.post('/', (req, res, next) => controller.create(req, res, next));

router.get('/', authenticationByJWT, (req, res, next) => controller.getAll(req, res, next));

// router.get('/:id', (req, res, next) => controller.getOne(req, res, next));
router.get('/:email', authenticationByJWT, (req, res, next) => controller.getOneByEmail(req, res, next));

router.put('/:email', authenticationByJWT, (req, res, next) => controller.update(req, res, next));

router.delete('/:email', authenticationByJWT, (req, res, next) => controller.delete(req, res, next));


module.exports = router;
