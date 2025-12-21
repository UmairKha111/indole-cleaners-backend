// import Product from "../models/Product.js";

// // GET ALL PRODUCTS
// export const getProducts = async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// };

// // GET SINGLE PRODUCT BY SLUG
// export const getProductBySlug = async (req, res) => {
//   const product = await Product.findOne({ slug: req.params.slug });

//   if (!product) return res.status(404).json({ message: "Product not found" });

//   res.json(product);
// };

// // ADD PRODUCT (we will use this later in admin panel)
// export const createProduct = async (req, res) => {
//   const product = new Product(req.body);
//   await product.save();
//   res.json(product);
// };
import Product from "../models/Product.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { name, price, image, description, category } = req.body;

    if (!name || !price || !image || !category) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const product = await Product.create({
      name,
      price,
      image,
      description,
      category,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};

    const products = await Product.find(filter);

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};


// GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false });
    res.json({ success: true, product });
  } catch {
    res.status(500).json({ success: false });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, product });
  } catch {
    res.status(500).json({ success: false });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
};
