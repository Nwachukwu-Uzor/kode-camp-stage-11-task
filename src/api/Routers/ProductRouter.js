import express from "express";
import {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProduct,
  getSearchForProduct,
} from "../Controllers/ProductsController.js";

const ProductRouter = express.Router();

ProductRouter.get("/", getAllProducts);
ProductRouter.get("/search", getSearchForProduct);
ProductRouter.get("/:id", getSingleProduct);
ProductRouter.post("/", createProduct);
ProductRouter.patch("/:id", updateProduct);
ProductRouter.delete("/:id", deleteProduct);

export default ProductRouter;
