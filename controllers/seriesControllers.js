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

module.exports = { getSeries, postSerie };
