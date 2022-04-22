const Product = require("../Models/ProductModel.js");
const {
  createSchema,
  updateSchema,
} = require("../Validation/ProductValidator.js");

const createProduct = async (req, res) => {
  const { name, description, category, price } = req.body;
  try {
    const { error } = createSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: `Invalid value for property ${error.details[0].path}`,
      });
    }

    const existing = await Product.find({ name });
    if (existing !== null) {
      return res.status(400).json({
        success: false,
        message: `A product exists with the name ${name}`,
      });
    }
    const newProduct = await Product.create({
      name,
      description,
      category,
      description,
      price,
    });
    return res.status(201).json({
      success: true,
      message: "message created successfully",
      data: newProduct,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid message" });
  }
};

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  try {
    return res.status(200).json({ data: products });
  } catch {
    return res.status(404).json({ message: "Not found" });
  }
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    return res.status(200).json({ data: product });
  } catch (error) {
    return res.status(404).json({ message: "Error invalid product id" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { product } = req.body;

  try {
    const { error } = updateSchema.validate(product);

    if (error) {
      return res.status(400).json({
        success: false,
        message: `Invalid value for property ${error.details[0].path}`,
      });
    }
    await Product.findByIdAndUpdate(id, { ...product });
    return res.status(200).json({ message: "update successful" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid product Id" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(401).json({ message: "Invalid Id" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
