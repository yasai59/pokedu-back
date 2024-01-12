import { Router } from "express";
import { userprojectDelete, userprojectGet, userprojectPost, userprojectPut, userprojectsGet } from "../controllers/userprojectController.js";

//Creamos la ruta
const router = Router();

//router.get("/", [verifyJWT], usersGet); ejemplo verificar

//Rutas USUARIOS_PROJECTES
router.get("/", userprojectsGet);
router.get("/user", userprojectGet);
router.post("/", userprojectPost);
router.put("/",userprojectPut);
router.delete("/",userprojectDelete);

export default router;
