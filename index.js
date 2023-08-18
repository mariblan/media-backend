const express = require('express');
const path = require('path');
const booksRouter = require('./routes/booksRoutes.js');
const seriesRouter = require('./routes/seriesRoutes.js');
const filmsRouter = require('./routes/filmsRoutes.js');

const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

const connectToDB = require('./DB/dbConnection.js');
connectToDB();

app.use(express.static('public'));
app.use(express.json());

app.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/books', booksRouter);
app.use('/series', seriesRouter);
app.use('/films', filmsRouter);

app.listen(port, () => {
  console.log('Server is running on port: ${port}');
});
