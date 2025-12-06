import express from "express";
import { scrapeAmazon } from "../controllers/scraperController";
import { protect } from "../middleware/authMiddleware";
import rateLimit from "express-rate-limit";

const router = express.Router();

// 🚨 Rate limiter to prevent Amazon blocking your IP
const scrapeLimiter = rateLimit({
  windowMs: 60 * 1000,   // 1 minute window
  max: 3,                // Allow max 3 scrape requests per minute
  message: {
    message: "Too many requests. Please wait a moment before scraping again."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 🛡️ Protected + Safe scraper route
router.post("/amazon", protect, scrapeLimiter, scrapeAmazon);

export default router;
