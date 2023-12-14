import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  try {
    jwt.verify(req.token);
  } catch (e) {
    return res.json({
      error: "Invalid token",
    });
  }

  next();
};

export default verifyJWT;
