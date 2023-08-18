const express = require('express');
const filmsRouter = express.Router();

filmsRouter.route('/').get((req, res) => {
  res.send('Hello from filmsRouter');
});

module.exports = filmsRouter;
