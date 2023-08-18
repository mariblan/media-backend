const booksCollection = require('../models/bookModel.js');

const getBooks = async (req, res) => {
  try {
    const books = await booksCollection.find();
    return res.status(200).json(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const postBook = async (req, res) => {
  try {
    const { title, author, year, rating, sinopsis, image } = req.body;

    if (!title || !author || !year || !rating || !sinopsis || !image)
      return res.status(400).send('Please provide all required fields');

    const findBook = await booksCollection.findOne({ title });
    if (findBook) return res.status(400).send('Book already exists');

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneBook = async (req, res) => {
  try {
    const { id } = req.params;
    const bookById = await booksCollection.findById(id);
    console.log(bookById);

    if (bookById) return res.status(200).json(bookById);

    if (!bookById) return res.status(404).send('Book not found');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const updateOneBook = async (req, res) => {
  try {
    const { id } = req.params;

    const findBook = await booksCollection.findById(id);

    if (!findBook) return res.status(404).send('Country does not exist');

    const updateBook = await booksCollection.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateBook);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteOneBook = async (req, res) => {
  try {
    const { id } = req.params;

    const findBook = await booksCollection.findById(id);

    if (!findBook) return res.status(400).send('Book does not exist');

    const deleteBook = await booksCollection.findByIdAndDelete(id);
    res.status(200).json(deleteBook);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getBooks,
  postBook,
  getOneBook,
  updateOneBook,
  deleteOneBook,
};
