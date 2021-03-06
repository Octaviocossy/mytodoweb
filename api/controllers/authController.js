const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwtFunction = require('./jwt');

exports.authenticateUser = async (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        errors: [
          {
            msg: 'Incorrect email address.',
            param: 'default',
          },
        ],
      });
    const correctPass = await bcryptjs.compare(password, user.password);

    if (!correctPass)
      return res.status(400).json({
        errors: [
          {
            msg: 'Incorrect Password.',
            param: 'password',
          },
        ],
      });

    jwtFunction(user, res);
  } catch (err) {
    res.status(400).json({
      errors: [
        {
          msg: `${err}`,
          param: 'default',
        },
      ],
    });
  }
};

exports.authUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json({ user });
  } catch (err) {
    res.status(500).json({
      errors: [
        {
          msg: `${err}`,
          param: 'default',
        },
      ],
    });
  }
};
