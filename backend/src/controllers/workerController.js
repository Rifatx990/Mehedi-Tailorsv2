// controllers/workerController.js
import { getWorkerByUser, getAssignedOrders } from "../models/Worker.js";
import pool from "../config/db.js";

export const workerDashboard = async (req, res) => {
  const worker = await getWorkerByUser(req.user.id);
  const orders = await getAssignedOrders(worker.id);

  res.json({ worker, orders });
};

export const updateWorkStatus = async (req, res) => {
  const { status } = req.body;
  await pool.query(
    "UPDATE worker_orders SET status=$1, completed_at=NOW() WHERE id=$2",
    [status, req.params.id]
  );
  res.json({ message: "Status updated" });
};
