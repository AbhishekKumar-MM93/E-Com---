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
  getUsersforAdmin,
  updateUserProfile,
} from "../controllers/authController.js";
import { admin, authMiddleware } from "../middleware/authMiddleWare.js";

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
userRouter
  .route("/createuser")
  .post(createUser)
  .get(authMiddleware, admin, getUsersforAdmin); // first test in postman

export default userRouter;
