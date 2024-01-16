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
import verifyTeacher from "../middlewares/verifyTeacher.js";
import verifyJWT from "../middlewares/verifyJWT.js";

//Creamos la ruta
const router = Router();


//Rutas usuarios
router.get("/", [verifyJWT, verifyTeacher], usersGet);
router.get("/students", [verifyJWT], studentsGet);
router.get("/user", [verifyJWT], userGet);
router.get("/usersproject", [verifyJWT], usersProjectGet);
router.post("/login", login);
router.post("/importusers", [verifyJWT, verifyTeacher], importUsersPost)
router.post("/", [verifyJWT, verifyTeacher], userPost);
router.delete("/", [verifyJWT, verifyTeacher], userDelete);
router.put("/", [verifyJWT, verifyTeacher], userPut);

export default router;
