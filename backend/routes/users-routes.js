const express = require('express');
const { check } = require('express-validator');
const usersController = require('../controllers/users-controller');
const checkAuth = require('../middleware/auth');
const fileUpload = require('../middleware/file-upload'); 

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

router.patch('/profile/:uid', 
  fileUpload.single('picture'),
  [
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
  check('favoriteThing1').not().isEmpty(),
  check('favoriteThing2').not().isEmpty(),
  check('favoriteThing3').not().isEmpty(),
  check('favoriteDartmouthTradition').not().isEmpty(),
  check('funFact').not().isEmpty(),
], usersController.updateUser);

module.exports = router;