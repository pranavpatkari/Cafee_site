import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { db } from "../services/firebase-db";
import { collection, addDoc } from "firebase/firestore";



export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);

  const [ordered, setOrdered] = useState(false);
  const [coffeeClaimed, setCoffeeClaimed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
  });

  // Load saved customer
  useEffect(() => {
    const saved = localStorage.getItem("customer");
    if (saved) {
      try {
        setCustomer(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 🔥 PDF GENERATOR
    const generatePDF = async (order) => {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");

    const doc = new jsPDF();

    // HEADER
    doc.setFillColor(30, 30, 30);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("Café & Books", 14, 18);

    doc.setFontSize(10);
    doc.text("Pune, India", 150, 18);

    // TITLE
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text("INVOICE", 14, 45);

    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 55);
    doc.text(`Invoice ID: ${Date.now()}`, 120, 55);

    // CUSTOMER
    doc.text(`Customer: ${order.customerName}`, 14, 65);
    doc.text(`Email: ${order.customerEmail}`, 14, 72);

    // TABLE
    const tableData = order.items.map(item => [
      item.name,
      item.qty,
      `₹${item.price}`,
      `₹${item.price * item.qty}`
    ]);

    autoTable(doc, {
      startY: 80,
      head: [["Item", "Qty", "Price", "Total"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [200, 150, 100] },
    });

    const finalY = doc.lastAutoTable.finalY;

    // TOTAL
    doc.setFontSize(12);
    doc.text(`Total: ₹${order.total}`, 14, finalY + 15);

    // FOOTER
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for visiting Café & Books!", 14, finalY + 30);

    return doc;
  };

  // 🔥 MAIN ORDER FUNCTION
  const handleOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!customer.name.trim()) {
      alert("Enter your name");
      return;
    }

    if (!isValidEmail(customer.email)) {
      alert("Enter valid email");
      return;
    }

    setLoading(true);

    const order = {
      items: cart.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
      })),
      total: Number(total),
      coffeeClaimed,

      customerName: customer.name,
      customerEmail: customer.email,

      status: "pending",
      payment: "cod",
      createdAt: Date.now(),
    };

    console.log("📦 ORDER:", order);

    try {
      // Save to Firebase
      await addDoc(collection(db, "orders"), order);

      // Save customer locally
      localStorage.setItem("customer", JSON.stringify(customer));

      // 🔥 Generate PDF
      const pdf = await generatePDF(order);
      pdf.save(`invoice-${Date.now()}.pdf`);

      alert("Order placed ✅");

      setOrdered(true);
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS UI
  if (ordered) {
    return (
      <section className="cart">
        <h2>Order Placed!</h2>
        <p>You will receive updates on your email</p>
      </section>
    );
  }

  return (
    <section className="cart">
      <h2>Your Order</h2>

      {/* USER INPUT */}
      <div className="cart-user">
        <input
          type="text"
          placeholder="Your name"
          value={customer.name}
          onChange={(e) =>
            setCustomer({ ...customer, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Your email"
          value={customer.email}
          onChange={(e) =>
            setCustomer({ ...customer, email: e.target.value })
          }
        />
      </div>

      {cart.length === 0 ? (
        <p>No items yet</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div key={i} className="cart-item">
              <span>
                {item.name} (₹{item.price})
              </span>

              <div>
                <button onClick={() => removeFromCart(item)}>-</button>
                <span> {item.qty} </span>
                <button onClick={() => addToCart(item)}>+</button>
              </div>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>

          <button
            className="order-btn"
            onClick={handleOrder}
            disabled={loading}
          >
            {loading ? "Placing..." : "Place Order"}
          </button>
        </>
      )}
    </section>
  );
}
