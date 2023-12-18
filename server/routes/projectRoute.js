import { Router } from "express";
import { projectDelete, projectGet, projectPost, projectPut, projectsGet } from "../controllers/projectController.js";

//Creamos la ruta
const router = Router();

//router.get("/", [verifyJWT], usersGet); ejemplo verificar

//Ruta para obtener todos los usuarios
router.get("/", projectsGet);
router.get("/project/", projectGet);
router.post("/", projectPost);
router.put("/",projectPut);
router.delete("/",projectDelete);

export default router;
