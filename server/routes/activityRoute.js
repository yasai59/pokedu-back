import { Router } from "express";
import {
  activityDelete,
  activityGet,
  activityPost,
  activityPut,
  activitiesGet,
  currentActivityUserGet,
  finishedActivityUserGet,
  activitiesGetByProject,
  activityPostMassive,
} from "../controllers/activityController.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import verifyTeacher from "../middlewares/verifyTeacher.js";

//Creamos la ruta
const router = Router();

//Rutas Actividades
router.get("/", [verifyJWT], activityGet);
router.get("/activity", [verifyJWT], activityGet);
router.post("/", [verifyJWT, verifyTeacher], activityPost);
router.put("/", [verifyJWT, verifyTeacher], activityPut);
router.delete("/", [verifyJWT, verifyTeacher], activityDelete);
router.get("/project", [verifyJWT], activitiesGetByProject);
router.get("/currentActivitysUser", [verifyJWT], currentActivityUserGet);
router.get("/finishedActivitysUser", [verifyJWT], finishedActivityUserGet);
router.post("/activityPostMassive", [verifyJWT, verifyTeacher], activityPostMassive);

export default router;
