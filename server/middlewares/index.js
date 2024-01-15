import verifyJWT from "./verifyJWT";
import verifyTeacher from "./verifyTeacher";

export const validarProfesor = [verifyJWT, verifyTeacher];
export const validarUsuario = [verifyJWT];
