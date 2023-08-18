const express = require('express');
const booksRouter = express.Router();
const {
  getBooks,
  postBook,
  getOneBook,
  updateOneBook,
  deleteOneBook,
} = require('../controllers/booksControllers.js');

booksRouter.route('/').get(getBooks).post(postBook);
booksRouter
  .route('/:id')
  .get(getOneBook)
  .put(updateOneBook)
  .delete(deleteOneBook);

module.exports = booksRouter;
