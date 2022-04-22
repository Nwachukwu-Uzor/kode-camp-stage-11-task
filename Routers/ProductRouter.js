const express = require("express");
const ProductController = require("../Controllers/ProductsController.js");

const ProductRouter = express.Router();

ProductRouter.get("/", ProductController.getAllProducts);
ProductRouter.get("/:id", ProductController.getSingleProduct);
ProductRouter.post("/", ProductController.createProduct);
ProductRouter.patch("/:id", ProductController.updateProduct);
ProductRouter.delete("/:id", ProductController.deleteProduct);

module.exports = ProductRouter;
