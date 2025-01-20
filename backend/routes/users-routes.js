const express = require('express');
const { check } = require('express-validator');
const usersController = require('../controllers/users-controller');
const checkAuth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', [
  check('email').normalizeEmail().isEmail(),
  check('password').isLength({min: 8}),
  check('name').not().isEmpty(),
],usersController.signup);

router.post('/login', usersController.login);

router.use(checkAuth);

router.get('/', usersController.getUsers);

router.get('/profile/:uid', usersController.getUserById);

module.exports = router;