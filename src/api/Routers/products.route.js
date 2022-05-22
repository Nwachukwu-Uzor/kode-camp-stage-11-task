import express from "express";
import {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProduct,
  getSearchForProduct,
} from "../Controllers/products.controller.js";

import authorize from "../Middleware/authorize.js";

const ProductRouter = express.Router();

ProductRouter.get("/", authorize, getAllProducts);
ProductRouter.get("/search", getSearchForProduct);
ProductRouter.get("/:id", getSingleProduct);
ProductRouter.post("/", authorize, createProduct);
ProductRouter.patch("/:id", updateProduct);
ProductRouter.delete("/:id", deleteProduct);

export default ProductRouter;
