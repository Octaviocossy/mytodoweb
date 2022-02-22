const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwtFunction = require('./jwt');

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    let user = await User.findOne({ email });
    const salt = await bcryptjs.genSalt(10);

    if (user) return res.status(400).json({ msg: 'User already exist' });
    user = new User(req.body);
    user.password = await bcryptjs.hash(password, salt);
    await user.save();
    jwtFunction(user, res);
  } catch (err) {
    res.status(400).json({ msg: `${err}` });
  }
};
