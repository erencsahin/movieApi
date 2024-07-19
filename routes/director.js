const express = require('express');
const router = express.Router();

const Director = require("../models/Director");


router.post('/add', async (req, res,next) => {
  const director = new Director(req.body);
  try{
    const savedDirector = await director.save();
    res.status(200).json(savedDirector);
  }catch (err){
    next(err);
  }
})

module.exports = router;
