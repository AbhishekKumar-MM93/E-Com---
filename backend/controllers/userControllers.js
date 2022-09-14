import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import genrateToken from "../Utilis/generateToken.js";
import { Validator } from "node-input-validator";
import {
  success,
  failed,
  error,
  unixTimestamp,
  fileUpload,
  checkValidation,
} from "../config/helper.js";

const createUser = expressAsyncHandler(async (req, res) => {
  // const { email, password } = req.body;

  const v = new Validator(req.body, {
    name: "required",
    email: "required|email",
    password: "required",
  });
  const Values = JSON.parse(JSON.stringify(v));
  const errorResponse = await checkValidation(v);
  if (errorResponse) {
    return failed(res, errorResponse);
  }

  const userExsist = await User.findOne({ email: Values.inputs.email });
  if (userExsist) {
    res.status(400);
    throw new Error("User All Ready Exsist");
  }

  /// craete our user data and register data
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(Values.inputs.password, salt);

  const user = await User.create({ ...Values.inputs, password: hash });
  const Token = genrateToken(user._id);
  if (user) {
    res.status(201);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      Login_Time: Token.loginTime,
      token: Token.token,
    });
  } else {
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
