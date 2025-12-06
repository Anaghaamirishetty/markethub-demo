import dotenv from "dotenv";
dotenv.config();  // <-- LOAD .env BEFORE ANYTHING

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";
import connectDB from "../config/database";

const createAdmin = async () => {
  try {
    // 1️⃣ Connect to MongoDB
    await connectDB();
    console.log("📦 Connected to MongoDB");

    // 2️⃣ Check if admin exists
    const existing = await User.findOne({ role: "admin" });
    if (existing) {
      console.log("✔ Admin already exists:", existing.email);
      process.exit(0);
    }

    // 3️⃣ Create admin
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@markethub.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("🎉 Admin Created Successfully!");
    console.log("👉 Email: admin@markethub.com");
    console.log("👉 Password: admin123");

    process.exit(0);
  } catch (err) {
    console.error("❌ ERROR creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
