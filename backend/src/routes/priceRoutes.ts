import express from "express";
import { getPriceHistory } from "../controllers/priceController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:productId", protect, getPriceHistory);

export default router;
