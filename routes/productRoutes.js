// import express from "express";
// import Product from "../models/Product.js";

// const router = express.Router();

// // Get all products
// router.get("/", async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });

// // Get product by slug
// router.get("/:slug", async (req, res) => {
//   try {
//     const product = await Product.findOne({ slug: req.params.slug });

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// export default router;
// import express from "express";
// import {
//   createProduct,
//   getProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct,
// } from "../controllers/productController.js";
// import { protectAdmin } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/", protectAdmin, getProducts);
// router.post("/", protectAdmin, createProduct);
// router.get("/:id", protectAdmin, getProductById);
// router.put("/:id", protectAdmin, updateProduct);
// router.delete("/:id", protectAdmin, deleteProduct);

// export default router;
import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getProducts);
router.get("/:id", getProductById);

// ADMIN
router.post("/", protectAdmin, createProduct);
router.put("/:id", protectAdmin, updateProduct);
router.delete("/:id", protectAdmin, deleteProduct);

export default router;
