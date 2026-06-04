import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Analytics({ orders }) {
  // 🧠 GROUP BY TIME (Revenue + Orders)
  const grouped = {};

  orders.forEach((order) => {
    const time = new Date(order.createdAt)
      .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    if (!grouped[time]) {
      grouped[time] = { time, revenue: 0, orders: 0 };
    }

    grouped[time].revenue += order.total;
    grouped[time].orders += 1;
  });

  const trendData = Object.values(grouped);

  // 🧠 CATEGORY SPLIT
  const categories = { food: 0, drinks: 0, desserts: 0 };

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const name = item.name.toLowerCase();

      if (name.includes("coffee") || name.includes("tea") || name.includes("latte")) {
        categories.drinks += item.qty;
      } else if (name.includes("cake") || name.includes("brownie") || name.includes("waffle")) {
        categories.desserts += item.qty;
      } else {
        categories.food += item.qty;
      }
    });
  });

  const pieData = [
    { name: "Food", value: categories.food },
    { name: "Drinks", value: categories.drinks },
    { name: "Desserts", value: categories.desserts },
  ];

  return (
    <div style={{ display: "grid", gap: "30px", marginBottom: "40px" }}>
      
      {/* 📈 REVENUE TREND */}
      <div className="card">
        <h3>📈 Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line dataKey="revenue" stroke="#c58a3d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📦 ORDERS TREND */}
      <div className="card">
        <h3>📦 Orders Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={trendData}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#5c4033" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🥧 CATEGORY SPLIT */}
      <div className="card">
        <h3>🥧 Category Split</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={80}>
              {pieData.map((entry, index) => (
                <Cell key={index} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
