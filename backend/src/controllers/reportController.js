// controllers/reportController.js
import pool from "../config/db.js";

export const salesReport = async (req, res) => {
  const { period } = req.query;

  let groupBy = "DATE(created_at)";
  if (period === "monthly") groupBy = "TO_CHAR(created_at, 'YYYY-MM')";
  if (period === "yearly") groupBy = "EXTRACT(YEAR FROM created_at)";

  const { rows } = await pool.query(`
    SELECT ${groupBy} as period,
           COUNT(*) as total_orders,
           SUM(total_amount) as revenue
    FROM orders
    GROUP BY period
    ORDER BY period DESC
  `);

  res.json(rows);
};

export const paymentReport = async (req, res) => {
  const { rows } = await pool.query(`
    SELECT u.name,
           SUM(CASE WHEN t.type='payment' THEN t.amount ELSE 0 END) as paid,
           SUM(CASE WHEN t.type='due' THEN t.amount ELSE 0 END) as due
    FROM transactions t
    JOIN users u ON u.id = t.user_id
    GROUP BY u.name
  `);

  res.json(rows);
};
