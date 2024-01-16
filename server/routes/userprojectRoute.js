import { Router } from "express";
import {
  userprojectDelete,
  userprojectGet,
  userprojectPost,
  userprojectPut,
  userprojectsGet,
  userprojectMultiplePost,
} from "../controllers/userprojectController.js";
import verifyTeacher from "../middlewares/verifyTeacher.js";
import verifyJWT from "../middlewares/verifyJWT.js";

//Creamos la ruta
const router = Router();

//Rutas USUARIOS_PROJECTES
router.get("/", [verifyJWT], userprojectsGet);
router.get("/user", [verifyJWT], userprojectGet);
router.post("/", [verifyJWT, verifyTeacher], userprojectPost);
router.post("/multiple", [verifyJWT, verifyTeacher], userprojectMultiplePost);
router.put("/", [verifyJWT, verifyTeacher], userprojectPut);
router.delete("/", [verifyJWT, verifyTeacher], userprojectDelete);

export default router;
