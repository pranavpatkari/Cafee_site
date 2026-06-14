import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

import "./DiscoverPage.css";

export default function DiscoverPage() {
    const heroSlides = [
    {
      image: "/menu/iced-coffee.jpg",
      title: "Premium Cold Coffee",
      subtitle: "Rich coffee blended with ice and cream"
    },
    {
      image: "/menu/cheese-burst-burger.jpg",
      title: "Cheese Burst Burger",
      subtitle: "Loaded with melted cheese and flavor"
    },
    {
      image: "/menu/brownie.jpg",
      title: "Chocolate Brownie",
      subtitle: "Freshly baked and served warm"
    },
    {
      image: "/menu/croissant.jpg",
      title: "Fresh Croissants",
      subtitle: "Buttery, flaky and oven fresh"
    }
  ];

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);
  const { cart, addToCart } = useContext(CartContext);

  const trendingItems = [
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

  const coffeeItems = [
    {
      name: "Cold Coffee",
      price: 120,
      image: "/menu/iced-coffee.jpg"
    },
    {
      name: "Cappuccino",
      price: 110,
      image: "/menu/cappuccino.jpg"
    },
    {
      name: "Espresso",
      price: 90,
      image: "/menu/espresso.jpg"
    },
    {
      name: "Strawberry Shake",
      price: 140,
      image: "/menu/strawberry-shake.jpg"
    }
  ];

  const dessertItems = [
    {
      name: "Chocolate Brownie",
      price: 120,
      image: "/menu/brownie.jpg"
    },
    {
      name: "Cupcake",
      price: 90,
      image: "/menu/cupcake.jpg"
    },
    {
      name: "Pancake",
      price: 160,
      image: "/menu/pancake.jpg"
    },
    {
      name: "Waffle",
      price: 180,
      image: "/menu/waffle.jpg"
    }
  ];

  const specialItems = [
    {
      name: "Croissant",
      price: 140,
      image: "/menu/croissant.jpg"
    },
    {
      name: "Avocado Toast",
      price: 220,
      image: "/menu/avacado_toast.jpg"
    },
    {
      name: "White Sauce Pasta",
      price: 240,
      image: "/menu/white_sauce_pasta.jpg"
    },
    {
      name: "Salad Bowl",
      price: 190,
      image: "/menu/salad_bowl.jpg"
    }
  ];

  const cartCount = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <div className="discover-page">
      <section
  className="hero-banner"
  style={{
    backgroundImage: `url(${heroSlides[slide].image})`
  }}
>
  <div className="hero-overlay">
    <h1>{heroSlides[slide].title}</h1>

    <p>
      {heroSlides[slide].subtitle}
    </p>

    <a href="#featured" className="hero-btn">
      Explore Menu
    </a>

    <div className="hero-dots">
      {heroSlides.map((_, index) => (
        <span
          key={index}
          className={
            slide === index
              ? "hero-dot active"
              : "hero-dot"
          }
          onClick={() => setSlide(index)}
        />
      ))}
    </div>
  </div>
</section>

      {/* TRENDING */}

      <section
        id="featured"
        className="discover-section"
      >
        <h2>🔥 Trending Now</h2>

        <div className="discover-row">
          {trendingItems.map((item, index) => (
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
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COFFEE */}

      <section className="discover-section">
        <h2>☕ Coffee Collection</h2>

        <div className="discover-row">
          {coffeeItems.map((item, index) => (
            <div
              key={index}
              className="discover-card"
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="card-overlay">
                <h3>{item.name}</h3>

                <p>₹{item.price}</p>

                <button
                  onClick={() => addToCart(item)}
                >
                  Add +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESSERTS */}

      <section className="discover-section">
        <h2>🍰 Dessert Collection</h2>

        <div className="discover-row">
          {dessertItems.map((item, index) => (
            <div
              key={index}
              className="discover-card"
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="card-overlay">
                <h3>{item.name}</h3>

                <p>₹{item.price}</p>

                <button
                  onClick={() => addToCart(item)}
                >
                  Add +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPECIALS */}

      <section className="discover-section">
  <h2>⭐ Cafe Specials</h2>

  <div className="discover-row">
    {specialItems.map((item, index) => (
      <div
        key={index}
        className="discover-card"
      >
        <img
          src={item.image}
          alt={item.name}
        />

        <div className="card-overlay">
          <h3>{item.name}</h3>

          <p>₹{item.price}</p>

          <button
            onClick={() => addToCart(item)}
          >
            Add +
          </button>
        </div>
      </div>
    ))}
  </div>
</section>
      <Link
        to="/cafe"
        className="floating-cart"
      >
        🛒 {cartCount}
      </Link>
    </div>
  );
}
