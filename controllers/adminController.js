import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Order from "../models/Order.js";

// ===============================
// ADMIN LOGIN
// ===============================
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid login",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid login",
      });
    }

    const token = jwt.sign(
      { id: admin._id, isAdmin: admin.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during admin login",
    });
  }
};

// ===============================
// ADMIN DASHBOARD STATS
// ===============================
export const getAdminStats = async (req, res) => {
  try {
    // Fetch latest orders
    const orders = await Order.find().sort({ createdAt: -1 });

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (sum, o) => sum + (o.total || 0),
      0
    );

    const pending = orders.filter(o => o.status === "Pending").length;
    const confirmed = orders.filter(o => o.status === "Confirmed").length;
    const outForDelivery = orders.filter(
      o => o.status === "Out for Delivery"
    ).length;
    const delivered = orders.filter(o => o.status === "Delivered").length;
    const cancelled = orders.filter(o => o.status === "Cancelled").length;

    // Today's orders
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todaysOrders = orders.filter(
      o => new Date(o.createdAt) >= startOfToday
    ).length;

    // ✅ FIXED: sanitize mongoose documents
    const recentOrders = orders.slice(0, 5).map(o => ({
      _id: o._id,
      total: o.total,
      status: o.status,
      customer: o.customer,
    }));

    return res.json({
      success: true,
      stats: {
        totalOrders,
        totalRevenue,
        pending,
        confirmed,
        outForDelivery,
        delivered,
        cancelled,
        todaysOrders,
      },
      recentOrders,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching admin stats",
    });
  }
};
