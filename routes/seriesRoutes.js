const express = require('express');
const seriesRouter = express.Router();
const { getSeries, postSerie } = require('../controllers/seriesControllers.js');

seriesRouter.route('/').get(getSeries).post(postSerie);

module.exports = seriesRouter;
