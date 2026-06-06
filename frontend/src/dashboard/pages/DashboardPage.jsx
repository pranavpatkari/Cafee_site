import { useEffect, useState } from "react";
import { db } from "../../services/firebase-db";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

import Analytics from "../components/Analytics";
import "../styles/dashboard.css";

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  const auth = getAuth();

  // 🔥 REAL-TIME ORDERS
  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);
    });

    return () => unsubscribe();
  }, []);

  // 🚪 LOGOUT
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  // 🔄 STATUS UPDATE
  const updateStatus = async (order, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", order.id), {
        status: newStatus,
      });

      if (order.customerEmail) {
        await fetch("http://localhost:5000/send-status-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
           body: JSON.stringify({
           email: order.customerEmail,
           name: order.customerName,
           items: order.items,   // 🔥 REQUIRED
           total: order.total,   // 🔥 REQUIRED
           status: newStatus,
        }),
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 FILTER
  const filteredOrders = orders.filter((order) => {
    if (filter === "preparing") return order.status === "preparing";
    if (filter === "done") return order.status === "done";
    return true;
  });

  const user = auth.currentUser;

  return (
    <div className="dashboard">

      {/* 🔝 HEADER */}
      <div className="dashboard-header">
        <h2>☕ Admin Dashboard</h2>

        <div className="admin-info">
          <span className="admin-email">👤 {user?.email}</span>

          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* 🔘 NAVBAR */}
      <div className="dashboard-nav">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "preparing" ? "active" : ""}
          onClick={() => setFilter("preparing")}
        >
          Preparing
        </button>

        <button
          className={filter === "done" ? "active" : ""}
          onClick={() => setFilter("done")}
        >
          Done
        </button>
      </div>

      {/* 📦 ORDERS FIRST */}
      <div>
        <h3>📦 Orders</h3>

        {filteredOrders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <div className="orders-grid">
            {filteredOrders.map((order) => (
              <div key={order.id} className="order-card">
                <h4>Order</h4>

                {/* CUSTOMER */}
                <p><strong>{order.customerName || "Guest"}</strong></p>
                <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                  {order.customerEmail}
                </p>

                {/* ITEMS */}
                <ul>
                  {order.items?.map((item, i) => (
                    <li key={i}>
                      {item.name} x{item.qty}
                    </li>
                  ))}
                </ul>

                {/* TOTAL */}
                <p><strong>Total:</strong> ₹{order.total}</p>

                {/* STATUS */}
                <div style={{ marginTop: "10px" }}>
                  <span className={`status ${order.status || "pending"}`}>
                    {order.status || "pending"}
                  </span>

                  {order.status === "pending" && (
                    <button
                      onClick={() => updateStatus(order, "preparing")}
                      style={{
                        marginLeft: "10px",
                        padding: "6px 10px",
                        border: "none",
                        borderRadius: "6px",
                        background: "#007bff",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Start Preparing
                    </button>
                  )}

                  {order.status === "preparing" && (
                    <button
                      onClick={() => updateStatus(order, "done")}
                      style={{
                        marginLeft: "10px",
                        padding: "6px 10px",
                        border: "none",
                        borderRadius: "6px",
                        background: "#28a745",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Mark Done
                    </button>
                  )}
                </div>

                {/* TIME */}
                <p className="order-time">
                  {order.createdAt?.seconds
                    ? new Date(order.createdAt.seconds * 1000).toLocaleString()
                    : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 📊 ANALYTICS BELOW */}
      <div style={{ marginTop: "40px" }}>
        <h3>📊 Analytics</h3>
        <div className="analytics-grid">
          <Analytics orders={orders} />
        </div>
      </div>

    </div>
  );
}
