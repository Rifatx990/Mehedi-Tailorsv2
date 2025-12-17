// controllers/paymentController.js
import pool from "../config/db.js";

export const addPayment = async (req, res) => {
  const { order_id, amount, type } = req.body;

  await pool.query(
    `INSERT INTO transactions (order_id, user_id, type, amount)
     VALUES ($1,$2,$3,$4)`,
    [order_id, req.user.id, type, amount]
  );

  res.json({ message: "Payment recorded" });
};

export const orderPayments = async (req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM transactions WHERE order_id=$1",
    [req.params.orderId]
  );
  res.json(rows);
};

export const customerDue = async (req, res) => {
  const { rows } = await pool.query(`
    SELECT o.id,
           o.total_amount -
           COALESCE(SUM(t.amount),0) as due
    FROM orders o
    LEFT JOIN transactions t ON o.id=t.order_id
    WHERE o.user_id=$1
    GROUP BY o.id
  `, [req.user.id]);

  res.json(rows);
};
