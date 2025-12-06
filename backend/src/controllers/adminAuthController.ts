import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const adminEmail = `${username}@markethub.com`;

    const admin = await User.findOne({ email: adminEmail, role: "admin" });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "30d" }
    );

    return res.json({
      message: "Admin login successful",
      token,
      user: admin
    });
  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error", err });
  }
};
