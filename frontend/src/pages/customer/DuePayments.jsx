// pages/customer/DuePayments.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function DuePayments() {
  const [dues, setDues] = useState([]);

  useEffect(() => {
    api.get("/payments/due").then(res => setDues(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Dues</h1>
      {dues.map(d => (
        <div key={d.id} className="bg-white p-3 shadow mb-2">
          Order #{d.id} — Due: ৳{d.due}
        </div>
      ))}
    </div>
  );
}
