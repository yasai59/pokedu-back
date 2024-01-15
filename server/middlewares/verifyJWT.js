import jwt from "jsonwebtoken";
import dbQuery from "../db/dbConnection.js";

// Verificamos JWT en el middeware
const verifyJWT = async (req, res, next) => {
  req.token = req.headers["authorization"];

  try {
    jwt.verify(req.token, process.env.SECRET);

    const id = jwt.decode(req.token);

    const result = await dbQuery(`SELECT * FROM USUARIOS WHERE id = ${id};`);

    req.user = result[0];
  } catch (e) {
    return res.status(400).json({
      error: "Invalid token",
    });
  }

  next();
};

export default verifyJWT;
