// routes/invoices.js
import express from "express";
import { authenticate } from "../middleware/auth.js";
import pool from "../config/db.js";
import { generateInvoicePDF } from "../utils/invoiceGenerator.js";

const router = express.Router();

router.get("/:orderId", authenticate(), async (req, res) => {
  const { orderId } = req.params;

  const invoice = await pool.query(
    "SELECT * FROM invoices WHERE order_id=$1",
    [orderId]
  );

  const order = await pool.query(
    "SELECT * FROM orders WHERE id=$1",
    [orderId]
  );

  const items = await pool.query(
    `SELECT p.name, oi.quantity, oi.price
     FROM order_items oi
     JOIN products p ON p.id=oi.product_id
     WHERE oi.order_id=$1`,
    [orderId]
  );

  const payments = await pool.query(
    "SELECT * FROM transactions WHERE order_id=$1",
    [orderId]
  );

  generateInvoicePDF(
    res,
    invoice.rows[0],
    order.rows[0],
    items.rows,
    payments.rows
  );
});

export default router;
