const filmsCollection = require('../models/filmModel.js');

const getFilms = async (req, res) => {
  try {
    const films = await filmsCollection.find();
    return res.status(200).json(films);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const postFilm = async (req, res) => {
  try {
    const { title, director, year, rating, sinopsis, image } = req.body;
    // We can do some validation whether our body is sending the expected data here. If not, we can send a 400 status code and a message to the client.
    if (!title || !director || !year || !rating || !sinopsis || !image)
      return res.status(400).send('Please provide all required fields');

    // Then additionally we can check if the author already exists in the database. If so, we can send a 400 status code and a message to the client.
    const findFilm = await filmsCollection.findOne({ title });
    if (findFilm) return res.status(400).send('Film already exists');

    // And lastly, we can create a new author and save it to the database if everything is ok.
    const newFilm = await filmsCollection.create(req.body);
    res.status(201).json(newFilm);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getFilms, postFilm };
