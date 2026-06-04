import { useState, useContext, useMemo } from "react";
import { CartContext } from "../../context/CartContext";

export default function Menu() {
  const [tab, setTab] = useState("food");
  const [search, setSearch] = useState("");
  const { addToCart } = useContext(CartContext);

  const menu = {
    food: [
      { name: "Classic Veg Burger", price: 130 },
      { name: "Cheese Burst Burger", price: 150 },
      { name: "Paneer Tikka Sandwich", price: 140 },
      { name: "Grilled Cheese Sandwich", price: 120 },
      { name: "Veg Club Sandwich", price: 160 },
      { name: "French Fries", price: 90 },
      { name: "Peri Peri Fries", price: 110 },
      { name: "Veg Wrap", price: 130 },
      { name: "Paneer Wrap", price: 150, special: true }, // ⭐
      { name: "Masala Maggi", price: 80, special: true }   // ⭐
    ],
    drinks: [
      { name: "Cold Coffee", price: 120, special: true }, // ⭐
      { name: "Iced Latte", price: 130 },
      { name: "Cappuccino", price: 110 },
      { name: "Espresso", price: 90 },
      { name: "Mocha", price: 140 },
      { name: "Chocolate Shake", price: 150 },
      { name: "Strawberry Shake", price: 140 },
      { name: "Vanilla Shake", price: 130 },
      { name: "Green Tea", price: 80 },
      { name: "Lemon Iced Tea", price: 100 }
    ],
    desserts: [
      { name: "Chocolate Brownie", price: 120 },
      { name: "Ice Cream Sundae", price: 150, special: true }, // ⭐
      { name: "Chocolate Cake", price: 140 },
      { name: "Cheesecake", price: 160 },
      { name: "Waffles", price: 180 },
      { name: "Pancakes", price: 160 },
      { name: "Choco Lava Cake", price: 130 },
      { name: "Cupcakes", price: 90 }
    ]
  };

  // 🔥 Filtering logic
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

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="menu-search"
      />

      {/* TABS */}
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

      {/* ITEMS */}
      <div className="menu-items">
        {filteredItems.length === 0 ? (
          <p className="empty-msg">No items found</p>
        ) : (
          filteredItems.map((item, i) => (
            <div key={i} className="menu-item">
              <div className="menu-info">
                <span className="menu-name">
                  {item.name} {item.special && "🔥"}
                </span>
                <span className="menu-price">₹{item.price}</span>
              </div>

              <button
                className="menu-add-btn"
                onClick={() => addToCart(item)}
              >
                Add
              </button>
            </div>
          ))
        )}
      </div>

      {/* CTA */}
      <a href="#cart" className="menu-cart-btn">
        View Order
      </a>
    </section>
  );
}
