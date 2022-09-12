import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/userControllers.js";
import {
  authUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController.js";
import { admin, authMiddleware } from "../middleware/authMiddleWare.js";
import {
  getUserByIdAdmin,
  getUsersforAdmin,
  updateUserbyAdmin,
  userDeleteByAdmin,
} from "../controllers/adminController.js";

const userRouter = express.Router();

userRouter.route("/createuser").post(createUser),
  userRouter.get("/getusers", getAllUser),
  userRouter.get("getuser/:id", getUser),
  userRouter.put("updateuser/:id", updateUser),
  userRouter.delete("deleteuser/:id", deleteUser);

////
userRouter.post("/login", authUser);
userRouter
  .route("/profile")
  .get(authMiddleware, getUserProfile)
  .put(authMiddleware, updateUserProfile);

////-----------------Admin-Route-------------------////

userRouter.route("/").get(authMiddleware, admin, getUsersforAdmin); // first test in postman

userRouter
  .route("/deletebyadmin/:id")
  .delete(authMiddleware, admin, userDeleteByAdmin);

userRouter
  .route("/getuserbyidadmin/:id")
  .get(authMiddleware, admin, getUserByIdAdmin);

userRouter
  .route("/updateuserbyadmin/:id")
  .put(authMiddleware, admin, updateUserbyAdmin);

export default userRouter;
