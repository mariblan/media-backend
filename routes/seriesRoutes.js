const express = require('express');
const seriesRouter = express.Router();
const {
  getSeries,
  postSerie,
  getOneSerie,
  updateOneSerie,
  deleteOneSerie,
} = require('../controllers/seriesControllers.js');

seriesRouter.route('/').get(getSeries).post(postSerie);
seriesRouter
  .route('/:id')
  .get(getOneSerie)
  .put(updateOneSerie)
  .delete(deleteOneSerie);

module.exports = seriesRouter;
