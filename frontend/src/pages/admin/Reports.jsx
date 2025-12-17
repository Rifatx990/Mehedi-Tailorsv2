// pages/admin/Reports.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";
import ReportTable from "../../components/admin/ReportTable";

export default function Reports() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    api.get("/reports/sales?period=monthly")
       .then(res => setSales(res.data));
  }, []);

  const exportCSV = () => {
    const csv = [
      "Period,Orders,Revenue",
      ...sales.map(s => `${s.period},${s.total_orders},${s.revenue}`)
    ].join("\n");

    const blob = new Blob([csv]);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "sales_report.csv";
    a.click();
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Sales Reports</h1>

      <button
        onClick={exportCSV}
        className="mb-4 bg-black text-white px-4 py-2"
      >
        Export CSV
      </button>

      <ReportTable
        columns={["period", "total_orders", "revenue"]}
        data={sales}
      />
    </>
  );
}
