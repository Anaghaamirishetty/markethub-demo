import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user"
    },

    tracklist: [
      {
        productId: String,
        title: String,
        url: String,
        price: Number
      }
    ],

    loginHistory: [
      {
        date: { type: Date, default: Date.now },
        ip: String
      }
    ]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
