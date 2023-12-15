import { Router } from "express";
import { userDelete, userGet, userPost, userPut, usersGet } from "../controllers/userController.js";
import verifyJWT from "../middlewares/verifyJWT.js";

//Creamos la ruta
const router = Router();


//router.get("/", [verifyJWT], usersGet); ejemplo verificar 

//Ruta para obtener todos los usuarios
router.get("/",  usersGet);
router.get("/user",  userGet);
router.post("/",  userPost);
router.delete("/",  userDelete);
router.put("/",  userPut);

export default router;
