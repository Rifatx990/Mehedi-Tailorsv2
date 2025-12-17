// pages/admin/Orders.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      <ul className="space-y-3">
        {orders.map(o => (
          <li key={o.id} className="bg-white p-3 shadow">
            Order #{o.id} — {o.status}
          </li>
        ))}
      </ul>
    </>
  );
}
