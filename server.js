import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

/* ===============================
   CORS (FIXED)
================================ */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://indole-cleaners-frontend.vercel.app", // 👈 ADD THIS
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(express.json());

/* ===============================
   ROUTES
================================ */
import productRoutes from "./routes/productRoutes.js";
import customerOrderRoutes from "./routes/customerOrderRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminSetupRoute from "./routes/adminSetupRoute.js";

// Health check
app.get("/health", (req, res) => {
  res.json({ success: true, message: "API is running 🚀" });
});

// Product Routes
app.use("/api/products", productRoutes);

// Admin Setup
app.use("/setup", adminSetupRoute);

// Customer Orders
app.use("/api/orders", customerOrderRoutes);

// Admin Orders
app.use("/api/admin/orders", adminOrderRoutes);

// Admin Auth & Stats
app.use("/api/admin", adminRoutes);
// ❌ API fallback (JSON only)
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

/* ===============================
   SERVER
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});

