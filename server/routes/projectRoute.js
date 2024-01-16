import { Router } from "express";
import {
  projectDelete,
  projectGet,
  projectPost,
  projectPut,
  projectUserGet,
  projectsGet,
} from "../controllers/projectController.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import verifyTeacher from "../middlewares/verifyTeacher.js";

//Creamos la ruta
const router = Router();

//router.get("/", [verifyJWT], usersGet); ejemplo verificar

//Rutas projectos
router.get("/", [verifyJWT], projectsGet);
router.get("/project", [verifyJWT], projectGet);
router.post("/", [verifyJWT, verifyTeacher], projectPost);
router.put("/", [verifyJWT, verifyTeacher], projectPut);
router.delete("/", [verifyJWT, verifyTeacher], projectDelete);
router.get("/projectuser", [verifyJWT], projectUserGet);

export default router;
