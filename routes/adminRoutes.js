// routes/adminRoutes.js
import express from "express";
import { adminLogin, getAdminStats } from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/stats", protectAdmin, getAdminStats);

export default router;
