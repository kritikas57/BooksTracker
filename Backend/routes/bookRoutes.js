
const express = require("express");
const router = express.Router();

const {
  addBook,
  getBooks,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

// Add a book
router.post("/addbook", addBook);

// Get all books
router.get("/getbooks", getBooks);

// Update a book
router.put("/updatebook/:id", updateBook);

// Delete a book
router.delete("/deletebook/:id", deleteBook);

module.exports = router;
