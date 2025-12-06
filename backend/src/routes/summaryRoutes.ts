import express from "express";
import { getPriceSummary } from "../controllers/summaryController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:productId", protect, getPriceSummary);

export default router;
