const express = require('express');
const { check } = require('express-validator');
const usersController = require('../controllers/users-controller');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post('/signup', [
  check('email').normalizeEmail().isEmail(),
  check('password').isLength({min: 8}),
  check('name').not().isEmpty(),
  check('year').not().isEmpty(),
  check('dev').not().isEmpty(),
  check('des').not().isEmpty(),
  check('pm').not().isEmpty(),
  check('core').not().isEmpty(),
  check('mentor').not().isEmpty(),
  check('major').not().isEmpty(),
  check('minor').not().isEmpty(),
  check('birthday').not().isEmpty(),
  check('home').not().isEmpty(),
  check('quote').not().isEmpty(),
  check('favorite thing 1').not().isEmpty(),
  check('favorite thing 2').not().isEmpty(),
  check('favorite thing 3').not().isEmpty(),
  check('favorite dartmouth tradition').not().isEmpty(),
  check('fun fact').not().isEmpty(),
  check('picture').not().isEmpty(),
],usersController.createUser);

router.post('/login', usersController.login);

module.exports = router;