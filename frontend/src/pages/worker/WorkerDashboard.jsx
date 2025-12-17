// pages/worker/WorkerDashboard.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function WorkerDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/workers/dashboard").then(res => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {data.worker.role}
      </h1>

      <h2 className="font-semibold mb-2">Assigned Orders</h2>
      {data.orders.map(o => (
        <div key={o.id} className="bg-white p-3 shadow mb-2">
          Order #{o.id} – {o.status}
          <button
            onClick={() =>
              api.put(`/workers/order/${o.id}`, { status: "completed" })
            }
            className="ml-4 bg-black text-white px-2"
          >
            Mark Done
          </button>
        </div>
      ))}
    </div>
  );
}
