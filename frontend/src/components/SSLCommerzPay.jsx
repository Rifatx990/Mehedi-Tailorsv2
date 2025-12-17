// components/SSLCommerzPay.jsx
import api from "../services/api";

export default function SSLCommerzPay({ orderId, amount }) {
  const pay = async () => {
    const res = await api.post("/sslcommerz/init", {
      orderId,
      amount
    });
    window.location.href = res.data.url;
  };

  return (
    <button
      onClick={pay}
      className="bg-green-600 text-white px-6 py-2 rounded"
    >
      Pay with SSLCommerz
    </button>
  );
}
