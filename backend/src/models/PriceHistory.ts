import mongoose from "mongoose";

const priceHistorySchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },  // ASIN or custom ID
    title: String,
    url: String,
    price: Number,
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("PriceHistory", priceHistorySchema);
