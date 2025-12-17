// pages/customer/AddPayment.jsx
import api from "../../services/api";

export default function AddPayment({ orderId }) {
  const pay = async () => {
    await api.post("/payments", {
      order_id: orderId,
      amount: 1000,
      type: "payment"
    });
    alert("Payment successful");
  };

  return (
    <button
      onClick={pay}
      className="bg-black text-white px-4 py-2"
    >
      Pay Now
    </button>
  );
}
