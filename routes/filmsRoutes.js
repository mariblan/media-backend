const express = require('express');
const filmsRouter = express.Router();
const { getFilms, postFilm } = require('../controllers/filmsControllers.js');

filmsRouter.route('/').get(getFilms).post(postFilm);

module.exports = filmsRouter;
