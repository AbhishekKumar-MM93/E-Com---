import jwt from "jsonwebtoken";
import { unixTimestamp } from "../config/helper.js";

const generateToken = (id) => {
  let token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  const loginTime = unixTimestamp();
  return {
    token,
    loginTime,
  };
};

export default generateToken;
