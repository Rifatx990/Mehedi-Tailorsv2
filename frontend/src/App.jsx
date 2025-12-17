// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminRoute from "./routes/AdminRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import Workers from "./pages/admin/Workers";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout><AdminDashboard /></AdminLayout>
          </AdminRoute>
        } />
        <Route path="/admin/products" element={<AdminRoute><AdminLayout><Products /></AdminLayout></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminLayout><Orders /></AdminLayout></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminLayout><Users /></AdminLayout></AdminRoute>} />
        <Route path="/admin/workers" element={<AdminRoute><AdminLayout><Workers /></AdminLayout></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
// App.jsx
import Reports from "./pages/admin/Reports";

<Route path="/admin/reports"
  element={
    <AdminRoute>
      <AdminLayout><Reports /></AdminLayout>
    </AdminRoute>
  }
/>
// App.jsx
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import WorkerRoute from "./routes/WorkerRoute";

<Route path="/worker"
  element={
    <WorkerRoute>
      <WorkerDashboard />
    </WorkerRoute>
  }
/>
