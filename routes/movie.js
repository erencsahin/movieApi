const express = require('express');
const router = express.Router();

// Models
const Movie = require("../models/Movie");

// POST /add - Create a new movie
router.post('/add', async function(req, res, next) {
  const { title, imdb_score, category, country, year } = req.body;
  const movie = new Movie({
    title,
    imdb_score,
    category,
    country,
    year
  });

  try {
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    next(err);
  }
});

// GET / - Get all movies
router.get('/getall', async function(req, res, next) {
  try {
    const data = await Movie.find();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/getbyid/:id', async function(req, res, next) {
  const movieId = req.params.id;
  try{
    const data=await Movie.findById(movieId,undefined,undefined);
    data===null ? res.status(404).send('No Movie Found') : res.status(200).send(data);
  }catch (err){
    next(err);
  }
})


module.exports = router;
