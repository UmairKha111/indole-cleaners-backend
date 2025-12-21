import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // ================= CUSTOMER INFO =================
    customer: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },

    // ================= ORDER ITEMS =================
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    // ================= TOTAL =================
    total: {
      type: Number,
      required: true,
    },

    // ================= ORDER STATUS =================
    status: {
      type: String,
      default: "Pending", // Pending | Confirmed | Out for Delivery | Delivered | Cancelled
    },

    // ================= PAYMENT INFO (NEW) =================
    payment: {
      method: {
        type: String,
        default: "Cash on Delivery",
      },
      status: {
        type: String,
        default: "Pending", // Pending | Paid | Failed
      },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
