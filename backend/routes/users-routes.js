const express = require('express');
const { check } = require('express-validator');
const usersController = require('../controllers/users-controller');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post('/signup', [
  check('email').normalizeEmail().isEmail(),
  check('password').isLength({min: 8}),
  check('name').not().isEmpty(),
],usersController.signup);

router.post('/login', usersController.login);

module.exports = router;