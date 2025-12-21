import express from "express";
import {
  getAllOrders,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} from "../controllers/orderController.js";

import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET ALL ORDERS (Admin)
router.get("/", protectAdmin, getOrders);

// GET ORDERS WITH DETAILS (Admin)
router.get("/all", protectAdmin, getAllOrders);

// GET SINGLE ORDER
router.get("/:id", protectAdmin, getOrderById);

// UPDATE ORDER STATUS
router.put("/:id/status", protectAdmin, updateOrderStatus);

// DELETE ORDER
router.delete("/:id", protectAdmin, deleteOrder);

export default router;
