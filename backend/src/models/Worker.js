// models/Worker.js
import pool from "../config/db.js";

export const getWorkerByUser = async (userId) => {
  const { rows } = await pool.query(
    "SELECT * FROM workers WHERE user_id=$1",
    [userId]
  );
  return rows[0];
};

export const getAssignedOrders = async (workerId) => {
  const { rows } = await pool.query(
    `SELECT o.id, o.status, o.delivery_date
     FROM worker_orders wo
     JOIN orders o ON o.id = wo.order_id
     WHERE wo.worker_id=$1`,
    [workerId]
  );
  return rows;
};
