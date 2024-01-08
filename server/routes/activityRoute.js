import { Router } from "express";
import { activityDelete, activityGet, activityPost, activityPut, activitiesGet, currentActivityUserGet, finishedActivityUserGet } from "../controllers/activityController.js";

//Creamos la ruta
const router = Router();

//router.get("/", [verifyJWT], usersGet); ejemplo verificar

//Ruta para obtener todos los usuarios
router.get("/", activitiesGet);
router.get("/activity", activityGet);
router.post("/", activityPost);
router.put("/",activityPut);
router.delete("/",activityDelete);
router.get("/currentActivitysUser", currentActivityUserGet);
router.get("/finishedActivitysUser", finishedActivityUserGet);

export default router;
