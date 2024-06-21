import { Router } from "express";
import {
  getMovies,
  getMovieById,
  addMovie,
  deleteMovieById,
  deleteMovies,
  updateMovieById,
} from "../controllers/movieController.js";

export const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);

router.post("/", addMovie);

router.delete("/:id", deleteMovieById);
router.delete("/", deleteMovies);

router.put("/:id", updateMovieById);
