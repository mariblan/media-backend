const { Schema, model } = require('mongoose');

const filmSchema = new Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  year: { type: Number, required: true },
  rating: { type: Number, required: true },
  sinopsis: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = model('Film', filmSchema);
