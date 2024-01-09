import { Router } from "express";
import { itemDelete, itemGet, itemPost, itemPut, itemsGet, itemsProjectGet } from "../controllers/itemController.js";

//Creamos la ruta
const router = Router();

//router.get("/", [verifyJWT], usersGet); ejemplo verificar

//Rutas ITEMS
router.get("/", itemsGet);
router.get("/item", itemGet);
router.get("/itemsproject", itemsProjectGet);
router.post("/", itemPost);
router.put("/",itemPut);
router.delete("/",itemDelete);

export default router;
