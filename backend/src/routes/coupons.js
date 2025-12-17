// routes/coupons.js
import express from "express";
import { authenticate } from "../middleware/auth.js";
import { createCoupon, applyCoupon } from "../controllers/couponController.js";

const router = express.Router();

router.post("/", authenticate(["admin"]), createCoupon);
router.post("/apply", authenticate(), applyCoupon);

export default router;
