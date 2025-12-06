import express from "express";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/protected", protect, (req, res) => {
  res.json({
    message: "You are authorized ✅"
  });
});

export default router;
