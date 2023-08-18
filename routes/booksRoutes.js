const express = require('express');
const booksRouter = express.Router();
const { getBooks, postBook } = require('../controllers/booksControllers.js');

booksRouter.route('/').get((req, res) => {
  res.send('Hello from booksRouter');
});

module.exports = booksRouter;
