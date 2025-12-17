// routes/WorkerRoute.jsx
import { Navigate } from "react-router-dom";

export default function WorkerRoute({ children }) {
  const role = localStorage.getItem("role");
  return role === "worker" ? children : <Navigate to="/" />;
}
