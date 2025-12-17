// routes/sslcommerz.js
import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  initiatePayment,
  paymentSuccess,
  paymentFail,
  paymentCancel
} from "../controllers/sslcommerzController.js";

const router = express.Router();

router.post("/init", authenticate(["customer"]), initiatePayment);
router.post("/success", paymentSuccess);
router.post("/fail", paymentFail);
router.post("/cancel", paymentCancel);
router.post("/ipn", ipnListener);

export default router;
