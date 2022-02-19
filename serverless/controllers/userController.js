const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    const salt = await bcryptjs.genSalt(10);

    if (user) return res.status(400).json({ msg: 'User already exists' });
    user = new User(req.body);
    user.password = await bcryptjs.hash(password, salt);
    await user.save();

    res.json({ msg: 'User Created' });
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};
