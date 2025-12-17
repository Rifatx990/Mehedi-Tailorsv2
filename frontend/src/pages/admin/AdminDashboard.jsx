// pages/admin/AdminDashboard.jsx
import StatCard from "../../components/admin/StatCard";

export default function AdminDashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value="124" />
        <StatCard title="Custom Orders" value="38" />
        <StatCard title="Total Revenue" value="৳ 1,20,000" />
        <StatCard title="Pending Orders" value="12" />
      </div>
    </>
  );
}
