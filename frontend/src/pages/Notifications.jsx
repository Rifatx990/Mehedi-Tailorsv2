// pages/Notifications.jsx
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Notifications() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/notifications").then(res => setItems(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Notifications</h1>
      {items.map(n => (
        <div key={n.id} className="bg-white p-3 shadow mb-2">
          <h2 className="font-semibold">{n.title}</h2>
          <p>{n.message}</p>
        </div>
      ))}
    </div>
  );
}
