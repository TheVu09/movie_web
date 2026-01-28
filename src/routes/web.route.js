import express from "express";
import { getMoviePage, getMovieDetailPage, getWatchMoviePage } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/", getMoviePage);
router.get("/movie/:id", getMovieDetailPage);

router.get("/movie/:id/watch", getWatchMoviePage);

export default router;