import { Router } from "express";
import {
  gradeDelete,
  gradeGet,
  gradePost,
  gradePut,
  gradesGet,
  gradePutMassive,
  gradeActGet,
  gradeItemGet,
} from "../controllers/gradeController.js";
import verifyTeacher from "../middlewares/verifyTeacher.js";
import verifyJWT from "../middlewares/verifyJWT.js";

//Creamos la ruta
const router = Router();

//Rutas NOTAS
router.get("/", [verifyJWT], gradesGet);
router.get("/grade", [verifyJWT], gradeGet);
router.get("/activity", [verifyJWT], gradeActGet);
router.get("/item", [verifyJWT], gradeItemGet);
router.post("/", [verifyJWT, verifyTeacher], gradePost);
router.put("/", [verifyJWT, verifyTeacher], gradePut);
router.put("/massive", [verifyJWT, verifyTeacher], gradePutMassive);
router.delete("/", [verifyJWT, verifyTeacher], gradeDelete);

export default router;
