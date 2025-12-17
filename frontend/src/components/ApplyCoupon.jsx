// components/ApplyCoupon.jsx
import { useState } from "react";
import api from "../services/api";

export default function ApplyCoupon({ total, onApply }) {
  const [code, setCode] = useState("");

  const apply = async () => {
    const res = await api.post("/coupons/apply", { code, total });
    onApply(res.data.discount);
  };

  return (
    <div className="flex gap-2">
      <input
        value={code}
        onChange={e => setCode(e.target.value)}
        className="border p-2"
        placeholder="Coupon Code"
      />
      <button onClick={apply} className="bg-black text-white px-4">
        Apply
      </button>
    </div>
  );
}
