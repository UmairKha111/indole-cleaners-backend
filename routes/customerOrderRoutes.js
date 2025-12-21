import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

/**
 * ✅ CREATE ORDER
 */
router.post("/", async (req, res) => {
  try {
    const { customer, items, total, payment } = req.body;

    if (!customer || !items || items.length === 0 || !total) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
    }

    const order = new Order({
      customer,
      items,
      total,
      payment: payment || {
        method: "Cash on Delivery",
        status: "Pending",
      },
    });

    await order.save();

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("ORDER CREATE ERROR:", error);

    // 🔥 THIS IS IMPORTANT
    res.status(500).json({
      success: false,
      message: "Server error while creating order",
    });
  }
});
/**
 * ✅ GET ORDERS BY CUSTOMER PHONE
 */
router.get("/customer/:phone", async (req, res) => {
  try {
    const { phone } = req.params;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const orders = await Order.find({
      "customer.phone": phone,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("FETCH CUSTOMER ORDERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
    });
  }
});
/**
 * ✅ GET SINGLE ORDER (CUSTOMER)
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("FETCH SINGLE ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching order",
    });
  }
});


export default router;
