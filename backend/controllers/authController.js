import bcrypt, { hash } from "bcrypt";
import User from "../models/UserModel.js";
import generateToken from "../Utilis/generateToken.js";
import asyncHandler from "express-async-handler";
import { Validator } from "node-input-validator";
import { checkValidation, failed } from "../config/helper.js";
// @route POST/api/users/login

const authUser = asyncHandler(async (req, res) => {
  // const { email, password } = req.body;
  const v = new Validator(req.body, {
    email: "required|email",
    password: "required",
  });
  const value = JSON.parse(JSON.stringify(v));
  const errorResponse = await checkValidation(v);
  if (errorResponse) {
    return failed(res.errorResponse);
  }

  const user = await User.findOne({ email: value.inputs.email });
  if (user && (await bcrypt.compare(value.inputs.password, user.password))) {
    let Token = generateToken(user._id);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      Token_Time: Token.loginTime,
      token: Token.token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @route GETapi/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.person.id);
  // console.log(user);
  if (user) {
    res.send({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @route PUT/api/users/profile
// @access Private need to be logged in

const updateUserProfile = asyncHandler(async (req, res) => {
  // check on postman first

  const user = await User.findById(req.person.id);
  // console.log(user)
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      // the updated password also store in hash
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(req.body.password, salt);
      user.password = hash;
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isVerified: updatedUser.isVerified,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, getUserProfile, updateUserProfile };

// async function Verify(req, res) {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       res.status(404).send({ message: "Invalid email or password" });
//     } else {
//       const compare = await bcrypt.compare(password, user.password);

//       if (!compare) {
//         res.status(404).send({
//           message: "Invalid email or password",
//         });
//       } else {
//         let token = await jwt.sign(
//           { user, expireIn: 120 },
//             process.env.JWT_SECRET_KEY

//         );
//         res.status(200).send({ message: "Login SucessFully", token });
//       }
//     }
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// }

// export default Verify;

//--- after hasing our password in --- we can do it in this way

// try {
//     let result = await User.findOne({ email });
//     if (result && (await result.matchPassword(password))) {
//       res.json({
//         name: result.name,
//         email: result.email,
//         isAdmin: result.isAdmin,
//         token: generateToken(result._id),
//       });

//       if (result) {
//         let generateToken = jwt.sign(
//             {
//               decoded,
//               expiresIn: 360,
//             },
//             process.env.JWT_SECRET_KET
//           );
//           res.status(200).send({ message: "Login Success", generateToken });
//       } else {
//        res.send("Invalid User")
//       }
//     } else {
//       res.send("User Not found");
//     }
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// }
