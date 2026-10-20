
const Book = require("../models/Book");

// Add a book
const addBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
};

// Get all books
const getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

// Update a book
const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(book);
};

// Delete a book
const deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted successfully" });
};

module.exports = {
  addBook,
  getBooks,
  updateBook,
  deleteBook
};
