import { Router } from "express";
import { projectDelete, projectGet, projectPost, projectPut, projectUserGet, projectsGet } from "../controllers/projectController.js";

//Creamos la ruta
const router = Router();

//router.get("/", [verifyJWT], usersGet); ejemplo verificar

//Rutas projectos
router.get("/", projectsGet);
router.get("/project", projectGet);
router.post("/", projectPost);
router.put("/",projectPut);
router.delete("/",projectDelete);
router.get("/projectuser", projectUserGet);

export default router;
