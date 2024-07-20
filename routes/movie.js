const express = require('express');
const router = express.Router();

// Models
const Movie = require("../models/Movie");

router.get('/top10', async function(req, res, next) {
  try{
    const data = await Movie.find(undefined, undefined, undefined).limit(5).sort({imdb_score: -1});
    res.status(200).json(data);
  }catch (err) {
    next(err);
  }
});

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

router.get('/getall', async function(req, res, next) {
  try {
    const data = await Movie.find(undefined,undefined,undefined);
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
    next({message:"there is no movie found to get."});
  }
})

router.put('/update/:id', async function(req, res, next) {
  const { title, imdb_score, category, year, country } = req.body;
  try {
    const data = await Movie.updateOne(
        { _id: req.params.id },
        { title, imdb_score, category, year, country },
    );
    if (data.nModified === 0) {
      return res.status(404).json({ message: "Movie not found or no changes made." });
    }
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.delete('/delete/:id', async function(req, res, next) {
    try{
      const movieId = await Movie.findOneAndDelete(req.params.id,undefined);
      if (!movieId){
        return res.status(404).send('No Movie Found');
      }
      res.status(200).json({message: 'Movie deleted successfully.'});
    }catch (err){
      next(err);
    }
});

router.get('/between/:start_year/:end_year',  (req, res, next)=> {
  const {start_year,end_year} = req.params;
  const promise=Movie.find({
    year:{
      "$gte":parseInt(start_year) , "$lte":parseInt(end_year)
    }
  })
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.status(404).send('No Movie Found');
  })
});

module.exports = router;
