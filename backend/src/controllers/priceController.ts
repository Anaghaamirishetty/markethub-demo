import { Request, Response } from "express";
import PriceHistory from "../models/PriceHistory";

export const getPriceHistory = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const days = Number(req.query.days) || 180; // default: 6 months

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const history = await PriceHistory.find({
      productId,
      timestamp: { $gte: fromDate }
    }).sort({ timestamp: 1 });

    return res.json(history);

  } catch (err) {
    console.error("HISTORY ERROR:", err);
    return res.status(500).json({
      message: "Failed to load history",
      error: err
    });
  }
};
