const express = require('express');
const {
  registerUser,
  loginUser,
} = require('../controllers/authControllers');
const { getUser } = require('../controllers/usersControllers');
const { verifyToken } = require('../middlewares/verifyToken');
const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/me', verifyToken, getUser);

module.exports = authRouter;
