// routes/payments.js
import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  addPayment,
  orderPayments,
  customerDue
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", authenticate(["admin","customer"]), addPayment);
router.get("/order/:orderId", authenticate(), orderPayments);
router.get("/due", authenticate(["customer"]), customerDue);

export default router;
