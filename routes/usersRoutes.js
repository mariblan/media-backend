const express = require('express');
const { getUser } = require('../controllers/usersControllers');
const { verifyToken } = require('../middlewares/verifyToken');
const usersRouter = express.Router();

usersRouter.route('/:userId').get(verifyToken, getUser);

module.exports = usersRouter;
