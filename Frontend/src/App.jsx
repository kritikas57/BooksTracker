
import { useState } from "react";
import "./App.css";
import BookCard from "./components/BookCard";
import BookForm from "./components/BookForm";

function App() {
  const [books, setBooks] = useState([
    {
      _id: "1",
      title: "The Shining",
      author: "Stephen King",
      genre: "Horror",
      totalPages: 447,
      pagesRead: 120,
      status: "Reading",
      rating: 0
    },
    {
      _id: "2",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Classic",
      totalPages: 432,
      pagesRead: 432,
      status: "Finished",
      rating: 5
    },
    {
      _id: "3",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      genre: "Thriller",
      totalPages: 336,
      pagesRead: 0,
      status: "Want to Read",
      rating: 0
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || book.status === filter;

    return matchesSearch && matchesFilter;
  });

  function addBook(book) {
    setBooks([...books, { ...book, _id: Date.now().toString() }]);
    setShowForm(false);
  }

  function updateBook(id, updatedData) {
    setBooks(
      books.map((book) =>
        book._id === id ? { ...book, ...updatedData } : book
      )
    );
  }

  function deleteBook(id) {
    setBooks(books.filter((book) => book._id !== id));
  }

  const finishedCount = books.filter(
    (book) => book.status === "Finished"
  ).length;

  return (
    <div className="app">
      <header className="header">
        <div className="brand">the reading nook.</div>
        <p>Your little corner of books and stories.</p>
      </header>

      <main className="container">
        <section className="welcome">
          <div>
            <p className="eyebrow">YOUR PERSONAL LIBRARY</p>
            <h1>My Bookshelf <span>✦</span></h1>
            <p className="subtitle">
              Every book takes you somewhere new.
            </p>
          </div>

          <button
            className="add-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close ×" : "+ Add a book"}
          </button>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>BOOKS COLLECTED</span>
            <h2>{books.length}</h2>
          </div>

          <div className="stat-card">
            <span>FINISHED BOOKS</span>
            <h2>{finishedCount}</h2>
          </div>

          <div className="stat-card">
            <span>CURRENTLY READING</span>
            <h2>
              {books.filter((book) => book.status === "Reading").length}
            </h2>
          </div>
        </section>

        {showForm && <BookForm addBook={addBook} />}

        <section className="library">
          <div className="library-heading">
            <h2>Your collection</h2>
            <span>{filteredBooks.length} books</span>
          </div>

          <div className="filters">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All books</option>
              <option value="Want to Read">Want to Read</option>
              <option value="Reading">Reading</option>
              <option value="Finished">Finished</option>
            </select>
          </div>

          <div className="book-grid">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  updateBook={updateBook}
                  deleteBook={deleteBook}
                />
              ))
            ) : (
              <p className="empty">
                No books found. Try another search or add a book!
              </p>
            )}
          </div>
        </section>
      </main>

      <footer>
        Made for people who are always reading one more chapter.
      </footer>
    </div>
  );
}

export default App;
