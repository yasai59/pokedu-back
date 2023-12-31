import { Router } from "express";
import { gradeDelete, gradeGet, gradePost, gradePut, gradesGet } from "../controllers/gradeController.js";

//Creamos la ruta
const router = Router();

//router.get("/", [verifyJWT], usersGet); ejemplo verificar

//Rutas NOTAS
router.get("/", gradesGet);
router.get("/grade", gradeGet);
router.post("/", gradePost);
router.put("/",gradePut);
router.delete("/",gradeDelete);

export default router;
