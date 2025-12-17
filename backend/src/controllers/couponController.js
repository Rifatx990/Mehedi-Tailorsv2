// controllers/couponController.js
import pool from "../config/db.js";

export const createCoupon = async (req, res) => {
  const { code, discount_type, discount_value, expires_at } = req.body;

  await pool.query(
    `INSERT INTO coupons (code, discount_type, discount_value, expires_at)
     VALUES ($1,$2,$3,$4)`,
    [code, discount_type, discount_value, expires_at]
  );

  res.json({ message: "Coupon created" });
};

export const applyCoupon = async (req, res) => {
  const { code, total } = req.body;

  const { rows } = await pool.query(
    "SELECT * FROM coupons WHERE code=$1 AND expires_at >= CURRENT_DATE",
    [code]
  );

  if (!rows.length) return res.status(400).json({ message: "Invalid coupon" });

  const c = rows[0];
  const discount =
    c.discount_type === "fixed"
      ? c.discount_value
      : (total * c.discount_value) / 100;

  res.json({ discount });
};
