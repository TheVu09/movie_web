import express from "express";
import { getLoginPage, login, logout, getRegisterPage, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/register", getRegisterPage);
router.post("/register", register);

router.get("/login", getLoginPage);
router.post("/login", login);

router.get("/logout", logout);

export default router;