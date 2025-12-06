import express from "express";
import { createAlert, getAlerts } from "../controllers/alertController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, createAlert);
router.get("/", protect, getAlerts);

export default router;
