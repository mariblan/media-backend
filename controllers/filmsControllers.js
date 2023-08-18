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

const getOneFilm = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(req.params.id.length);

    const filmById = await filmsCollection.findById(id);

    if (filmById) return res.status(200).json(filmById);

    if (!filmById) return res.status(404).send('Film not found');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateOneFilm = async (req, res) => {
  try {
    const { id } = req.params;

    // Since this PUT request is meant to update any of the Author's fields, we need to check
    // if the Author exists first
    const findFilm = await filmsCollection.findById(id);
    // If the Author does not exist, we return a 404 status code
    if (!findFilm) return res.status(404).send('Film does not exist');

    // If the Author exists, we can now update the Author's fields
    // The findByIdAndUpdate method takes a few parameters, at the bare minimum:
    // Tbe id of the document to update, and the fields to update.
    // However, if you need the updated document to be returned, you need to add the
    // {new: true} parameter as a third argument so your query returns you the updated document
    const updateFilm = await filmsCollection.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateFilm);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const deleteOneFilm = async (req, res) => {
  try {
    const { id } = req.params;

    const findFilm = await filmsCollection.findById(id);
    if (!findFilm) return res.status(400).send('Film does not exist');

    const deleteFilm = await filmsCollection.findByIdAndDelete(id);
    res.status(200).json(deleteFilm);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getFilms,
  postFilm,
  getOneFilm,
  updateOneFilm,
  deleteOneFilm,
};
