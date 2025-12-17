// routes/workers.js
import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  workerDashboard,
  updateWorkStatus
} from "../controllers/workerController.js";

const router = express.Router();

router.get("/dashboard", authenticate(["worker"]), workerDashboard);
router.put("/order/:id", authenticate(["worker"]), updateWorkStatus);

export default router;
