const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    next(err);
  }
});

router.post('/authenticate', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: 'Kimlik doğrulama başarısız, kullanıcı bulunamadı'
      });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        return res.json({
          status: false,
          message: 'Kimlik doğrulama başarısız, yanlış şifre'
        });
      } else {
        const payload = {
          username: username
        };
        const token = jwt.sign(payload, req.app.get('api_secret_key'), {
          expiresIn: '120m' // 120 dakika
        });
        res.json({
          status: true,
          token: token
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
