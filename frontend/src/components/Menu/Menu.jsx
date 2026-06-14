import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function Menu() {
  const { addToCart } = useContext(CartContext);
  const [tab, setTab] = useState("food");

  const menu = {
    food: [
      { name: "Classic Veg Burger", price: 130, image: "/menu/burger.jpg" },
      { name: "Cheese Burst Burger", price: 150, image: "/menu/cheese-burst-burger.jpg" },
      { name: "Paneer Tikka Sandwich", price: 140, image: "/menu/sandwich.jpg" },
      { name: "French Fries", price: 90, image: "/menu/fries.jpg" },
      { name: "Veg Wrap", price: 130, image: "/menu/wrap.jpg" },
      { name: "Masala Maggi", price: 80, image: "/menu/maggie.jpg" }
    ],

    drinks: [
      { name: "Cold Coffee", price: 120, image: "/menu/iced-coffee.jpg" },
      { name: "Cappuccino", price: 110, image: "/menu/cappuccino.jpg" },
      { name: "Espresso", price: 90, image: "/menu/espresso.jpg" },
      { name: "Green Tea", price: 80, image: "/menu/greentea.jpg" },
      { name: "Lemon Iced Tea", price: 100, image: "/menu/iced-lemon-tea.jpg" }
    ],

    desserts: [
      { name: "Chocolate Brownie", price: 120, image: "/menu/brownie.jpg" },
      { name: "Ice Cream Sundae", price: 150, image: "/menu/ice-cream-sundae.jpg" },
      { name: "Cupcake", price: 90, image: "/menu/cupcake.jpg" },
      { name: "Pancake", price: 160, image: "/menu/pancake.jpg" },
      { name: "Waffle", price: 180, image: "/menu/waffle.jpg" }
    ]
  };

  return (
    <section className="menu">
      <h2>Our Menu</h2>

      <div className="featured-section">
        <h3>🔥 Customer Favorites</h3>

        <div className="featured-items">
          <div className="featured-card">🍔 Cheese Burst Burger</div>
          <div className="featured-card">☕ Cold Coffee</div>
          <div className="featured-card">🍨 Ice Cream Sundae</div>
        </div>
      </div>

      <div className="menu-tabs">
        <button onClick={() => setTab("food")}>Food</button>
        <button onClick={() => setTab("drinks")}>Drinks</button>
        <button onClick={() => setTab("desserts")}>Desserts</button>
      </div>

      <div className="menu-items">
        {menu[tab].map((item, index) => (
          <div key={index} className="menu-item">
            <img
              src={item.image}
              alt={item.name}
              className="menu-image"
            />

            <div className="menu-info">
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>

              <button
                className="menu-add-btn"
                onClick={() => addToCart(item)}
              >
                Add +
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
