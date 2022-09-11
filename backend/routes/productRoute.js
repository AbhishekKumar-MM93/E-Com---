import express from "express";
import upload from "../config/multerConfig.js";
import {
  create,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", upload.single("image"), create);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.get("/:id", upload.single("image"), updateProduct);
productRouter.delete("/", deleteProduct);

export default productRouter;
