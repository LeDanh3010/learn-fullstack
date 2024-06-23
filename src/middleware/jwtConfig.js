import jwt from "jsonwebtoken";
require("dotenv").config();

const createJWT = (payload, expiresIn) => {
  const key = process.env.JWT_KEY;
  let token = null;
  const options = {
    expiresIn: expiresIn,
  };
  try {
    token = jwt.sign(payload, key, options);
  } catch (e) {}
  return token;
};
const verifyToken = (token) => {
  const key = process.env.JWT_KEY;
  try {
    const decoded = jwt.verify(token, key);
    console.log(decoded);
  } catch (e) {
    console.log(e);
  }
};

export { createJWT, verifyToken };
