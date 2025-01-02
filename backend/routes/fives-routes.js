const express = require('express');
const fivesController = require('../controllers/fives-controller');
const { check } = require('express-validator');

const router = express.Router();

router.get('/:fid', fivesController.getFiveById);

router.get('/user/:uid', fivesController.getFivesByUserId);

router.post('/', [
  check('to').not().isEmpty(),
  check('toId').not().isEmpty(),
  check('words').not().isEmpty(),
  check('from').not().isEmpty(),
  check('fromId').not().isEmpty(),
], fivesController.createFive);

router.patch('/:fid',
  [
    check('words').not().isEmpty(),
  ],
   fivesController.updateFive);

router.delete('/:fid', fivesController.deleteFive);

module.exports = router;