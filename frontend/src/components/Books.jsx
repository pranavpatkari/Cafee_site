import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function Books() {
  const { addToCart } = useContext(CartContext);
  const [filter, setFilter] = useState("all");

  const books = [
    { name: "Atomic Habits", price: 30, category: "self" },
    { name: "The Alchemist", price: 25, category: "fiction" },
    { name: "Rich Dad Poor Dad", price: 35, category: "self" },
    { name: "Ikigai", price: 20, category: "self" },
    { name: "Deep Work", price: 40, category: "self" },

    { name: "Dune", price: 50, category: "scifi" },
    { name: "Foundation", price: 45, category: "scifi" },
    { name: "1984", price: 30, category: "fiction" },
    { name: "Brave New World", price: 35, category: "scifi" },

    { name: "Harry Potter", price: 50, category: "fantasy" },
    { name: "Lord of the Rings", price: 60, category: "fantasy" },

    { name: "Sapiens", price: 50, category: "nonfiction" },
    { name: "Homo Deus", price: 55, category: "nonfiction" },

    { name: "The Psychology of Money", price: 35, category: "self" },
    { name: "Think and Grow Rich", price: 30, category: "self" },

    { name: "Sherlock Holmes", price: 40, category: "fiction" },
    { name: "The Hobbit", price: 45, category: "fantasy" },

    { name: "The Martian", price: 50, category: "scifi" },
    { name: "Project Hail Mary", price: 55, category: "scifi" }
  ];

  const filteredBooks =
    filter === "all"
      ? books
      : books.filter((b) => b.category === filter);

  return (
    <section id="books" className="books">
      <h2>📚 Rent a Book</h2>

      {/* FILTER */}
      <div className="book-filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("self")}>Self Help</button>
        <button onClick={() => setFilter("fiction")}>Fiction</button>
        <button onClick={() => setFilter("scifi")}>Sci-Fi</button>
        <button onClick={() => setFilter("fantasy")}>Fantasy</button>
      </div>

      {/* LIST */}
      <div className="books-list">
        {filteredBooks.map((book, i) => (
          <div key={i} className="book-item">

            <div>
              <span>{book.name}</span>
              <small>₹{book.price}/day</small>

              {/* OFFER */}
              {book.price >= 40 && (
                <p className="offer">🎁 Free Coffee Included</p>
              )}
            </div>

            <button onClick={() => addToCart(book)}>
              Rent
            </button>

          </div>
        ))}
      </div>
    </section>
  );
}
