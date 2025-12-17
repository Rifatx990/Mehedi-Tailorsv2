// components/DownloadInvoice.jsx
export default function DownloadInvoice({ orderId }) {
  return (
    <a
      href={`http://localhost:5000/api/invoices/${orderId}`}
      target="_blank"
      rel="noreferrer"
      className="bg-black text-white px-4 py-2 rounded"
    >
      Download Invoice
    </a>
  );
}
