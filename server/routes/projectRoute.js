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

//Creamos la ruta
const router = Router();

//router.get("/", [verifyJWT], usersGet); ejemplo verificar

//Rutas projectos
router.get("/", [verifyJWT], projectsGet);
router.get("/project", projectGet);
router.post("/", projectPost);
router.put("/", projectPut);
router.delete("/", projectDelete);
router.get("/projectuser", projectUserGet);

export default router;
