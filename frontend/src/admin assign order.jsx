// admin assign order
await pool.query(
  "INSERT INTO worker_orders (worker_id, order_id) VALUES ($1,$2)",
  [workerId, orderId]
);
