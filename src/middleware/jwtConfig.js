import jwt from "jsonwebtoken";
require("dotenv").config();

const nonSecurePaths = [
  "/",
  "/v1/register",
  "/v1/login",
  "/v1/logout",
  "/v1/role/getRole",
  "/v1/role/deleteRole",
];

const createJWT = (payload, expiresIn) => {
  const key = process.env.JWT_KEY;
  let token = null;
  const options = {
    expiresIn: expiresIn,
  };
  try {
    token = jwt.sign(payload, key, options);
  } catch (e) {
    console.log(e);
  }
  return token;
};

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const verifyToken = (token) => {
  const key = process.env.JWT_KEY;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (e) {
    console.log(e);
  }
  return decoded;
};

const checkUserWithJwt = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  const cookies = req.cookies;

  const headerToken = extractToken(req);

  const token = cookies?.jwt || headerToken;

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = cookies.jwt || headerToken;
      next();
    } else {
      return res.status(401).json({
        message: "User not authenticated checkUser",
        DE: "1",
      });
    }
  } else {
    return res.status(401).json({
      message: "User not authenticated Check Jwt",
      DE: "1",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path === "/v1/account")
    return next();
  if (req.user) {
    const { Roles } = req.user.groupWithRole;

    if (!Roles || Roles.length === 0) {
      return res.status(403).json({
        message: "Access denied",
        DE: "1",
        DT: "",
      });
    }
    const currentPath = req.path;
    const accessControl = Roles.some((item) => currentPath === item.url);

    if (!accessControl) {
      return res.status(403).json({
        message: "Access denied",
        DE: "1",
        DT: "",
      });
    } else {
      next();
    }
  } else {
    return res.status(401).json({
      message: "User not authenticated",
      DE: "1",
    });
  }
};

export { createJWT, verifyToken, checkUserWithJwt, checkUserPermission };
