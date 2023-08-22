const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;

    if (!authorization) return res.status(401).send('Access denied');

    const { id } = jwt.verify(authorization, process.env.JWT_SECRET);

    req.userId = id;
    next();
  } catch (error) {
    // res.status(401).send('Invalid token');
    next(error);
  }
};

module.exports = { verifyToken };
