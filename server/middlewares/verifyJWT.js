import jwt from "jsonwebtoken";
import dbQuery from "../db/dbConnection.js";

// Verificamos JWT en el middeware
const verifyJWT = (req, res, next) => {


  req.token = req.headers["authorization"];
  console.log(req.token);

  try {
    jwt.verify(req.token, process.env.SECRET);

    const id = jwt.decode(req.token);

  } catch (e) {
    return res.json({
      error: "Invalid token" ,
    });
  }

  next();
};

export default verifyJWT;
