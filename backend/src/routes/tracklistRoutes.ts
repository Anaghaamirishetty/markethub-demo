import express from "express";
import {
  addToTracklist,
  getTracklist,
  removeFromTracklist
} from "../controllers/tracklistController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, addToTracklist);
router.get("/", protect, getTracklist);
router.delete("/:productId", protect, removeFromTracklist);

export default router;
