const booksCollection = require('../models/bookModel.js');

const getBooks = async (req, res) => {
  // With async/await, we use try/catch to handle errors
  try {
    // Then we can query our database! This function is meant to return all countries in the database
    const books = await booksCollection.find();
    return res.status(200).json(books);
  } catch (error) {
    // If there is an error, we will send a 500 status code and the error's message to the client
    res.status(500).send(error.message);
  }
};

const postBook = async (req, res) => {
  try {
    const { title, author, year, rating, sinopsis, image } = req.body;
    // We can do some validation whether our body is sending the expected data here. If not, we can send a 400 status code and a message to the client.
    if (!title || !author || !year || !rating || !sinopsis || !image)
      return res.status(400).send('Please provide all required fields');

    // Then additionally we can check if the author already exists in the database. If so, we can send a 400 status code and a message to the client.
    const findBook = await booksCollection.findOne({ title });
    if (findBook) return res.status(400).send('Book already exists');

    // And lastly, we can create a new author and save it to the database if everything is ok.
    const newBook = await booksCollection.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getBooks, postBook };
