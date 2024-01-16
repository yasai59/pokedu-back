import { Router } from "express";
import {
  itemDelete,
  itemGet,
  itemPost,
  itemPut,
  itemsGet,
  itemsProjectGet,
  itemActivityGet,
} from "../controllers/itemController.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import verifyTeacher from "../middlewares/verifyTeacher.js";

//Creamos la ruta
const router = Router();

//Rutas ITEMS
router.get("/", [verifyJWT], itemsGet);
router.get("/item", [verifyJWT], itemGet);
router.get("/itemsproject", [verifyJWT], itemsProjectGet);
router.get("/itemactivity", [verifyJWT], itemActivityGet);
router.post("/", [verifyJWT, verifyTeacher], itemPost);
router.put("/", [verifyJWT, verifyTeacher], itemPut);
router.delete("/", [verifyJWT, verifyTeacher], itemDelete);

export default router;
