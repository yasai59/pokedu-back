import { Router } from "express";
import { usersGet } from "../controllers/userController.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const router = Router();

router.get("/", [verifyJWT], usersGet);

export default router;
