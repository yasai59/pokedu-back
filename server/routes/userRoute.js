import { Router } from "express";
import { usersGet } from "../controllers/userController.js";
import verifyJWT from "../middlewares/verifyJWT.js";

//Creamos la ruta
const router = Router();


//router.get("/", [verifyJWT], usersGet); ejemplo verificar 

//Ruta para obtener todos los usuarios
router.get("/",  usersGet);

export default router;
