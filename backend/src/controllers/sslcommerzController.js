// controllers/sslcommerzController.js
import { sslcommerzInit } from "../utils/sslcommerz.js";
import pool from "../config/db.js";
import { v4 as uuid } from "uuid";

export const initiatePayment = async (req, res) => {
  const { orderId, amount } = req.body;

  const tran_id = uuid();

  const data = {
    store_id: process.env.SSLC_STORE_ID,
    store_passwd: process.env.SSLC_STORE_PASSWORD,
    total_amount: amount,
    currency: "BDT",
    tran_id,
    success_url: `${process.env.BACKEND_URL}/api/sslcommerz/success`,
    fail_url: `${process.env.BACKEND_URL}/api/sslcommerz/fail`,
    cancel_url: `${process.env.BACKEND_URL}/api/sslcommerz/cancel`,
    ipn_url: `${process.env.BACKEND_URL}/api/sslcommerz/ipn`,
    shipping_method: "NO",
    product_name: "Tailoring Order",
    product_category: "Clothing",
    product_profile: "general",
    cus_name: req.user.id,
    cus_email: "customer@email.com",
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    cus_phone: "01700000000",
    is_live: process.env.SSLC_IS_LIVE === "true"
  };

  const response = await sslcommerzInit(data);

  // Save pending transaction
  await pool.query(
    `INSERT INTO transactions (order_id, user_id, type, amount)
     VALUES ($1,$2,'advance',$3)`,
    [orderId, req.user.id, amount]
  );

  res.json({ url: response.GatewayPageURL });
};

export const paymentSuccess = async (req, res) => {
  const { tran_id, amount } = req.body;

  // Mark order as paid/processing
  await pool.query(
    "UPDATE orders SET payment_status='paid', status='processing' WHERE id=$1",
    [req.body.value_a]
  );

  res.redirect(`${process.env.FRONTEND_URL}/payment-success`);
};

export const paymentFail = (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
};

export const paymentCancel = (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/payment-cancelled`);
};
// Add to sslcommerzController.js
export const ipnListener = async (req, res) => {
  const { tran_id, status, amount } = req.body;

  if (status === "VALID") {
    await pool.query(
      "UPDATE transactions SET type='payment' WHERE amount=$1",
      [amount]
    );
  }

  res.status(200).send("IPN received");
};
// controllers/sslcommerzController.js
import pool from "../config/db.js";
import { v4 as uuid } from "uuid";

export const paymentSuccess = async (req, res) => {
  const { tran_id, amount, value_a } = req.body;
  const orderId = value_a;

  // Calculate total paid
  const paidResult = await pool.query(
    "SELECT COALESCE(SUM(amount),0) FROM transactions WHERE order_id=$1",
    [orderId]
  );

  const paidAmount = paidResult.rows[0].coalesce;

  const orderResult = await pool.query(
    "SELECT total_amount FROM orders WHERE id=$1",
    [orderId]
  );

  const totalAmount = orderResult.rows[0].total_amount;

  // Create invoice
  const invoiceNumber = "INV-" + Date.now();

  await pool.query(
    `INSERT INTO invoices (order_id, invoice_number, total_amount, paid_amount)
     VALUES ($1,$2,$3,$4)`,
    [orderId, invoiceNumber, totalAmount, paidAmount]
  );

  // Update order status
  const status = paidAmount >= totalAmount ? "completed" : "processing";
  await pool.query(
    "UPDATE orders SET payment_status='paid', status=$1 WHERE id=$2",
    [status, orderId]
  );

  res.redirect(`${process.env.FRONTEND_URL}/payment-success?order=${orderId}`);
};
