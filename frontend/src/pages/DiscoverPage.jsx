import { useContext } from "react";
import { CartContext } from "../context/CartContext";

import "./DiscoverPage.css";

export default function DiscoverPage() {
  const { cart, addToCart } = useContext(CartContext);

  const items = [
    {
      name: "Classic Veg Burger",
      price: 130,
      image: "/menu/burger.jpg",
      rating: "4.8"
    },
    {
      name: "Cold Coffee",
      price: 120,
      image: "/menu/iced-coffee.jpg",
      rating: "4.7"
    },
    {
      name: "Chocolate Brownie",
      price: 120,
      image: "/menu/brownie.jpg",
      rating: "4.9"
    },
    {
      name: "Paneer Wrap",
      price: 150,
      image: "/menu/wrap.jpg",
      rating: "4.8"
    }
  ];

  const cartCount = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <div className="discover-page">

      <section className="hero-banner">
        <div className="hero-overlay">
          <h1>Folio Originals</h1>

          <p>
            Premium coffee, desserts and signature meals.
          </p>

          <a href="#featured" className="hero-btn">
            Explore Menu
          </a>
        </div>
      </section>

      <section
        id="featured"
        className="discover-section"
      >
        <h2>🔥 Trending Now</h2>

        <div className="discover-row">
          {items.map((item, index) => (
            <div
              key={index}
              className="discover-card"
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="card-overlay">

                <span className="rating">
                  ⭐ {item.rating}
                </span>

                <h3>{item.name}</h3>

                <p>₹{item.price}</p>

                <button
                  onClick={() =>
                    addToCart(item)
                  }
                >
                  Add to Cart
                </button>

              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="discover-section">
        <h2>☕ Coffee Collection</h2>

        <div className="discover-row">
          {items.map((item, index) => (
            <div
              key={index}
              className="discover-card small"
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="card-overlay">
                <h3>{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="discover-section">
        <h2>🍰 Dessert Collection</h2>

        <div className="discover-row">
          {items.map((item, index) => (
            <div
              key={index}
              className="discover-card small"
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="card-overlay">
                <h3>{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <a
        href="/cafe#cart"
        className="floating-cart"
      >
        🛒 {cartCount}
      </a>

    </div>
  );
}
