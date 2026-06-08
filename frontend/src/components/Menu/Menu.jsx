import { useState, useContext, useMemo } from "react";
import { CartContext } from "../../context/CartContext";

export default function Menu() {
  const [tab, setTab] = useState("food");
  const [search, setSearch] = useState("");
  const { addToCart } = useContext(CartContext);

  const menu = {
    food: [
      { name: "Classic Veg Burger", price: 130, image: "/menu/burger.jpg" },
      { name: "Cheese Burst Burger", price: 150, image: "/menu/cheese-burst-burger.jpg" },
      { name: "Paneer Tikka Sandwich", price: 140, image: "/menu/sandwich.jpg" },
      { name: "Grilled Cheese Sandwich", price: 120, image: "/menu/grilled-sandwich.jpg" },
      { name: "Veg Club Sandwich", price: 160, image: "/menu/sandwich.jpg" },
      { name: "French Fries", price: 90, image: "/menu/fries.jpg" },
      { name: "Peri Peri Fries", price: 110, image: "/menu/fries.jpg" },
      { name: "Veg Wrap", price: 130, image: "/menu/wrap.jpg" },
      { name: "Paneer Wrap", price: 150, image: "/menu/wrap.jpg", special: true },
      { name: "Masala Maggi", price: 80, image: "/menu/maggie.jpg", special: true }
    ],

    drinks: [
      { name: "Cold Coffee", price: 120, image: "/menu/iced-coffee.jpg", special: true },
      { name: "Iced Latte", price: 130, image: "/menu/iced-coffee.jpg" },
      { name: "Cappuccino", price: 110, image: "/menu/cappuccino.jpg" },
      { name: "Espresso", price: 90, image: "/menu/espresso.jpg" },
      { name: "Mocha", price: 140, image: "/menu/cappuccino.jpg" },
      { name: "Chocolate Shake", price: 150, image: "/menu/chocolate-brownie.jpg" },
      { name: "Strawberry Shake", price: 140, image: "/menu/strawberry-shake.jpg" },
      { name: "Vanilla Shake", price: 130, image: "/menu/vanilla-shake.jpg" },
      { name: "Green Tea", price: 80, image: "/menu/greentea.jpg" },
      { name: "Lemon Iced Tea", price: 100, image: "/menu/iced-lemon-tea.jpg" }
    ],

    desserts: [
      { name: "Chocolate Brownie", price: 120, image: "/menu/brownie.jpg" },
      { name: "Ice Cream Sundae", price: 150, image: "/menu/ice-cream-sundae.jpg", special: true },
      { name: "Chocolate Cake", price: 140, image: "/menu/dessert.jpg" },
      { name: "Cheesecake", price: 160, image: "/menu/dessert.jpg" },
      { name: "Waffles", price: 180, image: "/menu/waffle.jpg" },
      { name: "Pancakes", price: 160, image: "/menu/pancake.jpg" },
      { name: "Choco Lava Cake", price: 130, image: "/menu/chocolate-brownie.jpg" },
      { name: "Cupcakes", price: 90, image: "/menu/cupcake.jpg" }
    ]
  };

  const filteredItems = useMemo(() => {
    if (tab === "special") {
      return Object.values(menu)
        .flat()
        .filter(
          (item) =>
            item.special &&
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    return menu[tab].filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [tab, search]);

  return (
    <section id="menu" className="menu">
      <h2>Our Menu</h2>

      <input
        type="text"
        placeholder="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="menu-search"
      />

      <div className="menu-tabs">
        {["food", "drinks", "desserts", "special"].map((type) => (
          <button
            key={type}
            className={tab === type ? "active" : ""}
            onClick={() => setTab(type)}
          >
            {type === "special"
              ? "⭐ Specials"
              : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="menu-items">
        {filteredItems.map((item, i) => (
          <div key={i} className="menu-item">
            <img
              src={item.image}
              alt={item.name}
              className="menu-image"
            />

            <div className="menu-info">
              <span className="menu-name">
                {item.name}
                {item.special && (
                  <span className="item-badge">🔥 Bestseller</span>
                )}
              </span>

              <span className="menu-price">
                ₹{item.price}
              </span>
            </div>

            <button
              className="menu-add-btn"
              onClick={() => addToCart(item)}
            >
              Add +
            </button>
          </div>
        ))}
      </div>

      <a href="#cart" className="menu-cart-btn">
        View Order
      </a>
    </section>
  );
}
