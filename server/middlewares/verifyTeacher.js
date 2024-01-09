import jwt from "jsonwebtoken";

// Verificamos si es un profesor en el middeware
const verifyTeacher = (req, res, next) => {

  
  if(req.userType !== "TEACHER_ROLE"){
    return res.json({
      error: "No tienes permisos para realizar esta acción" ,
    });
  }

  next();
};

export default verifyTeacher;
