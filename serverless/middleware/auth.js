const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token)
    return res.status(401).json({
      auth: [
        {
          msg: 'Invalid Token',
          param: 'default',
        },
      ],
    });

  try {
    const pass = jwt.verify(token, process.env.tokenPass);

    req.user = pass.user;
    next();
  } catch (err) {
    res.status(401).json({
      auth: [
        {
          msg: 'Your session has expired',
          param: 'default',
        },
      ],
    });
  }
};
