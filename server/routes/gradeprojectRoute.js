import { Router } from "express";
import {
  gradeprojectDelete,
  gradeprojectGet,
  gradeprojectPost,
  gradeprojectPut,
  gradeprojectsGet,
  gradeprojectMultiplePost,
} from "../controllers/gradeprojectController.js";

//Creamos la ruta
const router = Router();

//router.get("/", [verifyJWT], usersGet); ejemplo verificar

//Rutas USUARIOS_PROJECTES
router.get("/", gradeprojectsGet);
router.get("/grade", gradeprojectGet);
router.post("/", gradeprojectPost);
router.post("/multiple", gradeprojectMultiplePost);
router.put("/", gradeprojectPut);
router.delete("/", gradeprojectDelete);

export default router;
