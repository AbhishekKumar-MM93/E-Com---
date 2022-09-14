import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";

// @route GETapi/users
// @access Private/ADMIN

const getUsersforAdmin = asyncHandler(async (req, res) => {
  const users = await User.find({});
  // console.log(user);
  res.json(users);
});

const userDeleteByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  // console.log(user);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Get user by ID
//@route GET api/users/:id
//@access Private/ADMIN

const getUserByIdAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  // console.log(user);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc  Update User
//@route PUT api/users/:id
//@access Private/ADMIN

const updateUserbyAdmin = asyncHandler(async (req, res) => {
  const { name, email, isAdmin, isVerified } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, {
    name,
    email,
    isAdmin,
    isVerified,
  });
  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
    });
  } else {
    res.send(404);
    throw new Error("User Not found");
  }
});

export {
  getUsersforAdmin,
  userDeleteByAdmin,
  getUserByIdAdmin,
  updateUserbyAdmin,
};
