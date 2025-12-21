import express from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const router = express.Router();

router.get("/create-admin", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.deleteMany({});

    const admin = await Admin.create({
      username: "admin",
      password: hashedPassword,
      isAdmin: true, // ⭐ VERY IMPORTANT
    });

    res.json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router; // ✅ THIS LINE WAS MISSING
