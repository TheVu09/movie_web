import express from "express";
import { requireLogin } from "../middlewares/auth.middleware.js";
import { addToFavorite, getFavoritesPage } from "../controllers/favorite.controller.js";

const router = express.Router();

router.get("/favorites", requireLogin, getFavoritesPage);
router.post("/favorite/:id", requireLogin, addToFavorite);

export default router;