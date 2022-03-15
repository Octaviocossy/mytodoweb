const jwt = require('jsonwebtoken');

const jwtFunction = (user, res) => {
  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(
    payload,
    process.env.tokenPass,
    {
      expiresIn: 3600,
    },
    (error, token) => {
      if (error) throw error;
      res.json({ token: token });
    }
  );
};

module.exports = jwtFunction;
