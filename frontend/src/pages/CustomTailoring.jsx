// pages/CustomTailoring.jsx
import axios from "../services/api";

export default function CustomTailoring() {
  const submit = async (e) => {
    e.preventDefault();
    await axios.post("/orders/custom", {
      measurements: { chest: 40, waist: 32 },
      notes: "Slim fit",
      delivery_date: "2025-01-20"
    });
    alert("Custom order placed!");
  };

  return (
    <form onSubmit={submit} className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold">Custom Tailoring</h2>
      <button className="bg-black text-white p-2 mt-4">
        Submit Order
      </button>
    </form>
  );
}
