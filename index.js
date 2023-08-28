const express = require('express');
const path = require('path');
const cors = require('cors');
const authRouter = require('./routes/authRoutes.js');
const usersRouter = require('./routes/usersRoutes.js');
const booksRouter = require('./routes/booksRoutes.js');
const seriesRouter = require('./routes/seriesRoutes.js');
const filmsRouter = require('./routes/filmsRoutes.js');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const connectToDB = require('./DB/dbConnection.js');
connectToDB();

app.use(
  cors({
    origin: process.env.LOCALPATH,
    optionsSuccessStatus: 200,
  })
);
app.use(express.static('public'));
app.use(express.json());

app.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/series', seriesRouter);
app.use('/films', filmsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
