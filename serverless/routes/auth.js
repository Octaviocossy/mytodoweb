const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post(
  '/',
  [
    check('email', 'Add a valid email').isEmail(),
    check('password', 'The password must have more than 6 characters').isLength(
      {
        min: 6,
      }
    ),
  ],
  authController.authenticateUser
);

router.get('/', auth, authController.authUser);

module.exports = router;
