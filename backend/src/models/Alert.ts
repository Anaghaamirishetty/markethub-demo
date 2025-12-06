import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    targetPrice: { type: Number, required: true },
    email: String,
    triggered: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Alert", alertSchema);
