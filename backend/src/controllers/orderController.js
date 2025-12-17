// controllers/orderController.js
import pool from "../config/db.js";

export const createCustomOrder = async (req, res) => {
  const { measurements, notes, delivery_date } = req.body;

  const { rows } = await pool.query(
    `INSERT INTO orders (user_id, order_type, status, delivery_date)
     VALUES ($1,'custom','pending',$2) RETURNING id`,
    [req.user.id, delivery_date]
  );

  await pool.query(
    `INSERT INTO measurements (user_id, order_id, measurements_json, notes)
     VALUES ($1,$2,$3,$4)`,
    [req.user.id, rows[0].id, measurements, notes]
  );

  res.json({ orderId: rows[0].id });
};
