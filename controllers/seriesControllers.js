const seriesCollection = require('../models/serieModel.js');

const getSeries = async (req, res) => {
  try {
    const series = await seriesCollection.find();
    return res.status(200).json(series);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const postSerie = async (req, res) => {
  try {
    const { title, producer, year, rating, sinopsis, image } = req.body;
    // We can do some validation whether our body is sending the expected data here. If not, we can send a 400 status code and a message to the client.
    if (!title || !producer || !year || !rating || !sinopsis || !image)
      return res.status(400).send('Please provide all required fields');

    // Then additionally we can check if the author already exists in the database. If so, we can send a 400 status code and a message to the client.
    const findSerie = await seriesCollection.findOne({ title });
    if (findSerie) return res.status(400).send('Serie already exists');

    // And lastly, we can create a new author and save it to the database if everything is ok.
    const newSerie = await seriesCollection.create(req.body);
    res.status(201).json(newSerie);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneSerie = async (req, res) => {
  try {
    const { id } = req.params;
    const serieById = await seriesCollection.findById(id);

    if (serieById) return res.status(200).json(serieById);

    if (!serieById) return res.status(404).send('Serie not found');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const updateOneSerie = async (req, res) => {
  try {
    const { id } = req.params;

    // Since this PUT request is meant to update any of the Author's fields, we need to check
    // if the Author exists first
    const findSerie = await seriesCollection.findById(id);
    // If the Author does not exist, we return a 404 status code
    if (!findSerie) return res.status(404).send('Serie does not exist');

    // If the Author exists, we can now update the Author's fields
    // The findByIdAndUpdate method takes a few parameters, at the bare minimum:
    // Tbe id of the document to update, and the fields to update.
    // However, if you need the updated document to be returned, you need to add the
    // {new: true} parameter as a third argument so your query returns you the updated document
    const updateSerie = await seriesCollection.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateSerie);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const deleteOneSerie = async (req, res) => {
  try {
    const { _id } = req.params;

    const findSerie = await seriesCollection.findById(id);

    if (!findSerie) return res.status(400).send('Country does not exist');

    const deleteSerie = await seriesCollection.findByIdAndDelete(id);
    res.status(200).json(deleteSerie);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getSeries,
  postSerie,
  getOneSerie,
  updateOneSerie,
  deleteOneSerie,
};
