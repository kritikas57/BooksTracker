
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: String,
  totalPages: Number,
  pagesRead: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: "Want to Read"
  },
  rating: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Book", bookSchema);
