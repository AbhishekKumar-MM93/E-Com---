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
  const user = await User.findById(req.params.id);
  // console.log(user);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isVerified: updatedUser.isVerified,
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
