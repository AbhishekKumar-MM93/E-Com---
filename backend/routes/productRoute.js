import express from "express";
import { productDeleteByAdmin } from "../controllers/adminController.js";
import upload from "../config/multerConfig.js";
import {
  create,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authMiddleware, admin } from "../middleware/authMiddleWare.js";
import { authenticateHeader } from "../config/checkHeaderKey.js";

const productRouter = express.Router();

productRouter.post("/createproduct", upload.single("image"), create);
productRouter.get("/getallproduct", getProducts);
productRouter.get("/getproduct/:id", getProduct);
productRouter.get("/updateproduct/:id", upload.single("image"), updateProduct);
productRouter.delete("/deleteproduct/:id", deleteProduct);

///----------admin----------//
productRouter
  .route("/deletebyadminproduct/:id")
  .delete(authenticateHeader, authMiddleware, admin, productDeleteByAdmin);
export default productRouter;
