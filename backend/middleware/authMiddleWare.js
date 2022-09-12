import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      let result = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      // console.log(result);
      req.person = await User.findById(result.id).select("-password");

      next();
      // let duration = parseInt(new Date().getTime() / 1000 - result.iat);
      // if (duration > result.expiresIn) {
      //   res.send({ msg: "Season expired Please Login First" });
      // } else {
      //   next();
      // }
    } catch (error) {
      res.status(404);
      throw new Error("Session has expire Please login first");
    }
  } else {
    res.status(404).json("Not Authorized, No token");
  }
});

// To check if user is admin or not

export const admin = (req, res, next) => {
  if (req.person && req.person.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an Admin");
  }
};

// console.log("MIDDLEWARE WORKING");
// export const authMiddleWare = expressAsyncHandler(async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       console.log(token);
//       const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
//       console.log(decoded);
//       req.person = await User.findById(decoded.id).select("-password"); // all of our User data now in req.person

//       // console.log(req.person);

//       next();
//     } catch (error) {
//       console.log("ERROR");
//       res
//         .status(400)
//         .json("Not authorized, Invailed token , Token has Expired");
//     }
//   } else {
//     console.log("ERROR2");
//     res.status(400).json("NOt Authorization, No Token");
//   }
// });

// import jwt from "jsonwebtoken";
// import expressAsyncHandler from "express-async-handler";
// import User from "../Models/User.js";
// import dotenv from "dotenv";
// dotenv.config();
