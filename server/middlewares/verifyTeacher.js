import jwt from "jsonwebtoken";

// Verificamos si es un profesor en el middeware
const verifyTeacher = (req, res, next) => {
  if (req.user.tipus !== "TEACHER_ROLE") {
    return res.status(400).json({
      error: "No tienes permisos para realizar esta acción",
    });
  }

  next();
};

export default verifyTeacher;
