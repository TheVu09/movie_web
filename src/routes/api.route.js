import express from "express";
import { getMovieApi, getMovieDetailPage } from "../controllers/movie.api.controller.js";

const router = express.Router();

router.get("/movies", getMovieApi);
router.get("/movie/:id", getMovieDetailPage);

export default router;