
import { useState } from "react";

function BookCard({ book, updateBook, deleteBook }) {
  const [showProgress, setShowProgress] = useState(false);
  const [pages, setPages] = useState(book.pagesRead);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(book.rating || 5);
  const [showDelete, setShowDelete] = useState(false);
  const [error, setError] = useState("");

  const progress = Math.round(
    (book.pagesRead / book.totalPages) * 100
  );

  function saveProgress(e) {
    e.preventDefault();

    const number = Number(pages);

    if (
      pages === "" ||
      !Number.isInteger(number) ||
      number < 0 ||
      number > book.totalPages
    ) {
      setError("Enter pages between 0 and " + book.totalPages);
      return;
    }

    const status =
      number === book.totalPages
        ? "Finished"
        : number > 0
        ? "Reading"
        : "Want to Read";

    updateBook(book._id, {
      pagesRead: number,
      status,
      rating: status === "Finished" ? book.rating : 0
    });

    setShowProgress(false);
    setError("");
  }

  function saveRating(e) {
    e.preventDefault();

    updateBook(book._id, { rating: Number(rating) });
    setShowRating(false);
  }

  return (
    <div className="book-card">
      <div className="book-cover">
        <span className="cover-decoration">✦</span>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <span className="cover-genre">{book.genre}</span>
      </div>

      <div className="book-info">
        <span
          className={`status ${
            book.status === "Finished"
              ? "finished"
              : book.status === "Reading"
              ? "reading"
              : "want"
          }`}
        >
          {book.status}
        </span>

        <p className="pages">
          {book.pagesRead} / {book.totalPages} pages
        </p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="progress-text">{progress}% completed</p>

        {book.status === "Finished" && (
          <p className="rating">
            {book.rating > 0
              ? "★".repeat(book.rating) + "☆".repeat(5 - book.rating)
              : "Not rated yet"}
          </p>
        )}

        {showProgress && (
          <form className="card-edit-form" onSubmit={saveProgress}>
            <label>Pages read</label>
            <input
              type="number"
              min="0"
              max={book.totalPages}
              step="1"
              value={pages}
              onChange={(e) => {
                setPages(e.target.value);
                setError("");
              }}
              required
            />

            {error && <p className="form-error">{error}</p>}

            <button type="submit">Save Progress</button>
            <button
              type="button"
              onClick={() => {
                setShowProgress(false);
                setError("");
              }}
            >
              Cancel
            </button>
          </form>
        )}

        {showRating && (
          <form className="card-edit-form" onSubmit={saveRating}>
            <label>Rate this book</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </select>

            <button type="submit">Save Rating</button>
            <button
              type="button"
              onClick={() => setShowRating(false)}
            >
              Cancel
            </button>
          </form>
        )}

        {showDelete && (
          <div className="delete-confirm">
            <p>Are you sure you want to delete this book?</p>
            <button onClick={() => deleteBook(book._id)}>
              Yes, Delete
            </button>
            <button onClick={() => setShowDelete(false)}>
              Cancel
            </button>
          </div>
        )}

        <div className="book-actions">
          {!showProgress && (
            <button
              onClick={() => {
                setPages(book.pagesRead);
                setShowProgress(true);
                setShowRating(false);
                setShowDelete(false);
              }}
            >
              Update Progress
            </button>
          )}

          {book.status === "Finished" && !showRating && (
            <button
              onClick={() => {
                setRating(book.rating || 5);
                setShowRating(true);
                setShowProgress(false);
                setShowDelete(false);
              }}
            >
              Rate
            </button>
          )}

          {!showDelete && (
            <button
              className="delete-btn"
              onClick={() => {
                setShowDelete(true);
                setShowProgress(false);
                setShowRating(false);
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookCard;
