const express = require('express');
const seriesRouter = express.Router();

seriesRouter.route('/').get((req, res) => {
  res.send('Hello from seriesRouter');
});

module.exports = seriesRouter;
