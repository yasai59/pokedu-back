import { Router } from "express";
import { gradeprojectDelete, gradeprojectGet, gradeprojectPost, gradeprojectPut, gradeprojectsGet } from "../controllers/gradeprojectController.js";

//Creamos la ruta
const router = Router();

//router.get("/", [verifyJWT], usersGet); ejemplo verificar

//Ruta para obtener todos los usuarios
router.get("/", gradeprojectsGet);
router.get("/grade", gradeprojectGet);
router.post("/", gradeprojectPost);
router.put("/",gradeprojectPut);
router.delete("/",gradeprojectDelete);

export default router;
