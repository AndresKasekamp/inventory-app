import { Movie } from "../models/Movie.js";
import { Op } from "sequelize";

export const getMovies = async (req, res) => {
  const title = req.query.title;

  // Title exist
  if (title !== undefined) {
    const allMoviesByTitle = await Movie.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    });
    res.status(200).json(allMoviesByTitle);

    // Retrieving all movies
  } else {
    const allMovies = await Movie.findAll();
    res.status(200).json(allMovies);
  }
};

export const getMovieById = async (req, res) => {
  // Getting the id out of the URL
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json("ID is incorrect");
    return;
  }

  const movieById = await Movie.findOne({ where: { id: id } });
  if (movieById === null) {
    res.status(404).json("Movie not found");
    return;
  }
  res.status(200).json(movieById);
};

export const addMovie = async (req, res) => {
  // Parsing movie title and description
  const { title, description } = req.body;

  if (title === undefined || description === undefined) {
    res.status(400).send("Wrong parameters provided");
    return;
  }

  // Checking for duplicates
  const movieById = await Movie.findOne({
    where: { title: title, description: description },
  });

  if (movieById !== null) {
    res.status(409).send("Movie already exists");
    return;
  }

  await Movie.create({ title: title, description: description });

  res.status(200).send("Movie added successfully");
};

export const deleteMovies = async (req, res) => {
  await Movie.destroy({ truncate: true });
  res.status(200).send("All movies deleted");
};

export const deleteMovieById = async (req, res) => {
  // Getting the id out of the URL
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json("ID is incorrect");
    return;
  }

  const movieById = await Movie.findOne({ where: { id: id } });
  if (movieById === null) {
    res.status(404).json("Movie not found");
    return;
  }

  await Movie.destroy({ where: { id: id } });
  res.status(200).send("Movie deleted successfully");
};

export const updateMovieById = async (req, res) => {
  // Getting the id out of the URL
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json("ID is incorrect");
    return;
  }

  // Parsing movie title and description
  const { title, description } = req.body;

  if (title === undefined || description === undefined) {
    res.status(400).send("Wrong credentials provided");
    return;
  }

  const movieById = await Movie.findOne({ where: { id: id } });
  if (movieById === null) {
    res.status(404).json("Movie not found");
    return;
  }

  await Movie.update(
    { title: title, description: description },
    { where: { id: id } }
  );
  res.status(201).send("Movie updated successfully");
};
