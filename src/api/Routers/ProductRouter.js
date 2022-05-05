const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProduct,
  getSearchForProduct,
} = require("../Controllers/ProductsController.js");

const ProductRouter = express.Router();

ProductRouter.get("/", getAllProducts);
ProductRouter.get("/search", getSearchForProduct);
ProductRouter.get("/:id", getSingleProduct);
ProductRouter.post("/", createProduct);
ProductRouter.patch("/:id", updateProduct);
ProductRouter.delete("/:id", deleteProduct);

module.exports = ProductRouter;
