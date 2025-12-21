import Order from "../models/Order.js";

// ===============================
// CREATE ORDER
// ===============================
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating order",
    });
  }
};

// ===============================
// GET ALL ORDERS (ADMIN)
// ===============================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get all orders error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
    });
  }
};

// ===============================
// GET ORDERS LIST (DASHBOARD)
// ===============================
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().select(
      "customer total status createdAt"
    );

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
    });
  }
};

// ===============================
// GET SINGLE ORDER BY ID
// ===============================
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get order by ID error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching order",
    });
  }
};

// ✅ Allowed transitions (industry standard)
const STATUS_FLOW = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: ["Out for Delivery", "Cancelled"],
  "Out for Delivery": ["Delivered"],
  Delivered: [],
  Cancelled: [],
};

// ===============================
// UPDATE ORDER STATUS (ADMIN)
// ===============================
// UPDATE ORDER STATUS (ADMIN)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



// ===============================
// DELETE ORDER
// ===============================
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await order.deleteOne();

    return res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Delete order error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting order",
    });
  }
};
// ===============================
// GET ORDERS BY CUSTOMER PHONE
// ===============================
export const getOrdersByCustomer = async (req, res) => {
  try {
    const phone = req.params.phone;

    const orders = await Order.find({
      "customer.phone": phone,
    }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Customer orders error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch customer orders",
    });
  }
};
// ===============================
// GET ORDERS BY CUSTOMER PHONE
// ===============================
export const getOrdersByCustomerPhone = async (req, res) => {
  try {
    const { phone } = req.params;

    const orders = await Order.find({
      "customer.phone": phone,
    }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Customer orders error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch customer orders",
    });
  }
};
