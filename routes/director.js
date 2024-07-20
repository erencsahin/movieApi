const express = require('express');
const router = express.Router();

const Director = require("../models/Director");


router.get('/top10',async function (req,res,next){
    try{
        const data=await Director.find(undefined,undefined,undefined).sort({surname:-1});
        res.status(200).json(data);
    }catch (err){
        next(err);
    }
})

router.post('/add', async (req, res,next) => {
  const director = new Director(req.body);
  try{
    const savedDirector = await director.save();
    res.status(200).json(savedDirector);
  }catch (err){
    next(err);
  }
});

router.get('/getall',async function(req, res, next) {
    try{
      const data=await Director.find(undefined,undefined,undefined);
      res.status(200).json(data);
    }catch (err){
      next(err);
    }
})

router.get('/getbyid/:id', async function(req, res, next) {
    const movieId = req.params.id;
    try{
        const data= await Director.findById(movieId,undefined,undefined);
        data===null ? res.status(404).send('Not Found') : res.status(200).json(data);
    }catch (err){
        next(err);
    }
})

router.put('/update/:id', async (req, res, next) => {
    const {name,surname,bio, topFilm}=req.body;
    try{
        const data=await Director.updateOne(
            {_id:req.params.id},
            {name,surname,bio, topFilm},
        );
        data===null ? res.status(404).send('director not found to update') : res.status(200).json(data);
    } catch (err){
        next(err);
    }
});

router.delete('/delete/:id', async function(req, res, next) {
    try{
        const data=await Director.findOneAndDelete(req.params.id,undefined);
        data===null ? res.status(404).send('director not found to delete') : res.json("deleted successfully.");
    }catch (err){
        next(err);
    }
});

module.exports = router;
