import jwt from "jsonwebtoken";

// Verificamos JWT en el middeware
const verifyTeacher = (req, res, next) => {
  try {
    jwt.verify(req.token);
    const id = jwt.decode(req.token);
    // TODO: verificar que el usuario sea profesor
  } catch (e) {
    return res.json({
      error: "Invalid token",
    });
  }

  next();
};

export default verifyTeacher;
