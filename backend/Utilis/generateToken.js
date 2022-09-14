import jwt from "jsonwebtoken";
import { unixTimestamp } from "../config/helper.js";

const generateToken = (id) => {
  let token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30m",
  });
  const loginTime = unixTimestamp();
  return {
    token,
    loginTime,
  };
};

export default generateToken;
