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

module.exports = { getBooks, postBook };
