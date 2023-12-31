import { Router } from "express";
import {
  importUsersPost,
  login,
  studentsGet,
  userDelete,
  userGet,
  userPost,
  userPut,
  usersGet,
  usersProjectGet,
} from "../controllers/userController.js";

//Creamos la ruta
const router = Router();

//router.get("/", [verifyJWT], usersGet); ejemplo verificar

//Rutas usuarios
router.get("/", usersGet);
router.get("/students", studentsGet);
router.get("/user", userGet);
router.get("/usersproject", usersProjectGet);
router.post("/login", login);
router.post("/importusers", importUsersPost)
router.post("/", userPost);
router.delete("/", userDelete);
router.put("/", userPut);

export default router;
