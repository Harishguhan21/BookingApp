import express from "express";
import { login, register, userDetails } from "../controllers/auth.js";
import { verifyUser } from "../Utils/verifyToken.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/userDetails",verifyUser, userDetails);

export default router;
