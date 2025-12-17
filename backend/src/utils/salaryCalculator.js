// utils/salaryCalculator.js
import pool from "../config/db.js";

export const calculateSalary = async (workerId) => {
  const { rows } = await pool.query(`
    SELECT COUNT(*) as completed
    FROM worker_orders
    WHERE worker_id=$1 AND status='completed'
  `, [workerId]);

  return rows[0].completed * 300; // 300 per order
};
