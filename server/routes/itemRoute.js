import { Router } from "express";
import { itemDelete, itemGet, itemPost, itemPut, itemsGet } from "../controllers/itemController.js";

//Creamos la ruta
const router = Router();

//router.get("/", [verifyJWT], usersGet); ejemplo verificar

//Ruta para obtener todos los usuarios
router.get("/", itemsGet);
router.get("/item", itemGet);
router.post("/", itemPost);
router.put("/",itemPut);
router.delete("/",itemDelete);

export default router;
