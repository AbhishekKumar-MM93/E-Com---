import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import genrateToken from "../Utilis/generateToken.js";

const createUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExsist = await User.findOne({ email });
  if (userExsist) {
    res.status(400);
    throw new Error("User All Ready Exsist");
  } else if (!password) {
    res.status(400);
    throw new Error("Invalid user Data");
  }

/// craete our user data and register data
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({ ...req.body, password: hash });
  if (user) {
    res.status(201);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      token: genrateToken(user._id),
    });
  } 
  else {
  res.status(400);
  throw new Error("Invalid email or password");
  }
});

async function getAllUser(req, res) {
  try {
    let result = await User.find();
    res.status(200).send({ sucess: true, result });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getUser(req, res) {
  try {
    let result = await User.findById(req.params.id);
    res.status(200).send({ sucess: true, result });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function updateUser(req, res) {
  try {
    let result = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({ sucess: true, result });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteUser(req, res) {
  try {
    let result = await User.deleteOne({ _id: req.params.id });
    res.status(200).send({ sucess: true, result });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export { createUser, getAllUser, getUser, updateUser, deleteUser };
