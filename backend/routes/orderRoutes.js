import express from "express";
import {
  addOrderItems,
  getOrderById,
  getMyOrder,
  UpdateOrderToPay,
} from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleWare.js";

const orderRouter = express.Router();

orderRouter.route("/").post(authMiddleware, addOrderItems);
orderRouter.route("/myorders").get(authMiddleware, getMyOrder);
orderRouter.route("/:id").get(authMiddleware, getOrderById);
orderRouter.route("/:id/pay").put(authMiddleware, UpdateOrderToPay);

export default orderRouter;
