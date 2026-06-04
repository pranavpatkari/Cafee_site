import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OrdersChart({ orders }) {
  // 🧠 Convert orders → chart data
  const data = orders.map((order) => ({
    time: new Date(order.createdAt).toLocaleTimeString(),
    total: order.total,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>📈 Revenue (Live)</h3>

      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#c58a3d"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
