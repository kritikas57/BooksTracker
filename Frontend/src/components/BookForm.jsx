
import { useState } from "react";

function BookForm({ addBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("Fiction");
  const [totalPages, setTotalPages] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !totalPages) {
      alert("Please fill in all fields.");
      return;
    }

    if (!Number.isInteger(Number(totalPages)) || Number(totalPages) <= 0) {
      alert("Total pages must be a positive whole number.");
      return;
    }

    addBook({
      title: title.trim(),
      author: author.trim(),
      genre,
      totalPages: Number(totalPages),
      pagesRead: 0,
      status: "Want to Read",
      rating: 0
    });

    setTitle("");
    setAuthor("");
    setGenre("Fiction");
    setTotalPages("");
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>Add a new book ✦</h2>

      <label>Book Title</label>
      <input
        type="text"
        placeholder="e.g. The Shining"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Author</label>
      <input
        type="text"
        placeholder="e.g. Stephen King"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />

      <label>Genre</label>
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        <option>Fiction</option>
        <option>Horror</option>
        <option>Thriller</option>
        <option>Fantasy</option>
        <option>Romance</option>
        <option>Mystery</option>
        <option>Classic</option>
        <option>Non-fiction</option>
        <option>Other</option>
      </select>

      <label>Total Pages</label>
      <input
        type="number"
        placeholder="e.g. 350"
        min="1"
        step="1"
        value={totalPages}
        onChange={(e) => setTotalPages(e.target.value)}
        required
      />

      <button type="submit" className="submit-btn">
        Add to Bookshelf
      </button>
    </form>
  );
}

export default BookForm;
