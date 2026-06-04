import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart } = useCart();

  return (
    <section style={{ padding: "100px 40px" }}>
      <h1>🛒 Your Order</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item, i) => (
        <div key={i} style={{
          marginBottom: "20px",
          padding: "20px",
          border: "1px solid #ddd"
        }}>
          <h3>{item.name}</h3>
          <p>Qty: {item.qty}</p>
          <p>Status: {item.status}</p>
          <p>₹{item.price * item.qty}</p>
        </div>
      ))}
    </section>
  );
}
