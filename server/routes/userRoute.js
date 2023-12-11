import { Router } from "express";
import { usersGet } from "../controllers/userController.js";

const router = Router();

router.get("/", usersGet);

export default router;
