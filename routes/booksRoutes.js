const express = require('express');
const booksRouter = express.Router();
const { getBooks, postBook } = require('../controllers/booksControllers.js');

booksRouter.route('/').get(getBooks).post(postBook);

module.exports = booksRouter;
