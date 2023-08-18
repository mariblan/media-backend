const express = require('express');
const filmsRouter = express.Router();
const {
  getFilms,
  postFilm,
  getOneFilm,
  updateOneFilm,
  deleteOneFilm,
} = require('../controllers/filmsControllers.js');

filmsRouter.route('/').get(getFilms).post(postFilm);
filmsRouter
  .route('/:id')
  .get(getOneFilm)
  .put(updateOneFilm)
  .delete(deleteOneFilm);

module.exports = filmsRouter;
