// routes/reports.js
import express from "express";
import { authenticate } from "../middleware/auth.js";
import { salesReport, paymentReport } from "../controllers/reportController.js";

const router = express.Router();

router.get("/sales", authenticate(["admin"]), salesReport);
router.get("/payments", authenticate(["admin"]), paymentReport);

export default router;
