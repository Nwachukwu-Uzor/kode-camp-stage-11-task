import Product from "../Models/products.model.js";

import { createSchema, updateSchema } from "../Validation/ProductValidator.js";

// CREATE A PRODUCT
export const createProduct = async (req, res) => {
  const { name, description, category, price } = req.body;
  try {
    const { error } = createSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: `Invalid value for property ${error.details[0].path}`,
      });
    }

    const existing = await Product.findOne({ name });
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
      user: req.user.id,
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

// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  const products = await Product.find().sort({ price: 1 });
  try {
    return res.status(200).json({ data: products });
  } catch {
    return res.status(404).json({ message: "Not found" });
  }
};

// GET ALL PRODUCTS IN A CATEGORY
export const getSearchForProduct = async (req, res) => {
  const { category: searchCategory, name: searchName } = req.query;

  try {
    const query = {};
    if (searchCategory) {
      query.category = { $eq: searchCategory };
    }

    if (searchName) {
      query.name = { $eq: searchName };
    }

    const products = await Product.find(query).sort({ price: 1 });

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: `No product found for the search criteria`,
      });
    }

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: `Error occured ${error.message}` });
  }
};

// GET A SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No product found" });
    }

    return res.status(200).json({ data: product, success: true });
  } catch (error) {
    return res.status(404).json({ message: "Error invalid product id" });
  }
};

// UPDATE A PRODUCT
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  try {
    const { error } = updateSchema.validate(product);

    if (error) {
      return res.status(400).json({
        success: false,
        message: `Invalid value for property ${error.details[0].path}`,
      });
    }

    const prod = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    if (!prod) {
      return res
        .status(404)
        .json({ success: false, message: "Product no found!" });
    }

    return res
      .status(200)
      .json({ success: true, message: "update successful", data: prod });
  } catch (error) {
    return res
      .status(401)
      .json({ message: `An error occured ${error.message}` });
  }
};

// DELETE A SINGLE PRODUCT
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(401).json({ message: "Invalid Id" });
  }
};
