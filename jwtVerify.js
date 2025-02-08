import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const _authCookieToken = (req, res, next) => {
  const authCookie = req.cookies.authcookie;
  if (authCookie == null) return res.status(401).json({ msg: "No cookie!" });
  else jwt.sign(authCookie, process.env.jwtPass);
  next();
};

export default _authCookieToken;
