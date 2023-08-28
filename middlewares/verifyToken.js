const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;

    console.log(authorization);

    if (!authorization) return res.status(401).send('Access denied');

    const { _id } = jwt.verify(authorization, process.env.JWT_SECRET);
    console.log(_id);
    req.userId = _id;
    next();
  } catch (error) {
    // res.status(401).send('Invalid token');
    next(error);
  }
};

module.exports = { verifyToken };
