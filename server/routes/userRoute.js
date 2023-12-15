import { Router } from "express";
import {
  login,
  userDelete,
  userGet,
  userPost,
  userPut,
  usersGet,
} from "../controllers/userController.js";

//Creamos la ruta
const router = Router();

//router.get("/", [verifyJWT], usersGet); ejemplo verificar

//Ruta para obtener todos los usuarios
router.get("/", usersGet);
router.get("/user", userGet);
router.get("/login", login);

router.post("/", userPost);
router.delete("/", userDelete);
router.put("/", userPut);

export default router;
