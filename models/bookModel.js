const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  category: { type: String, required: true, default: 'book' },
  rating: { type: Number, required: true },
  sinopsis: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = model('Book', bookSchema);
