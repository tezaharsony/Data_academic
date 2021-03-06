const express = require('express');
const router = express.Router()
const model = require('../models')

router.get('/', (req, res) => {
  res.render('register')
})

router.post('/', (req, res, next) => {
  if(!req.body.username || !req.body.password)
  {
    res.send('Please enter username and password')
  } else {
    model.User.create({
      'username' : req.body.username,
      'password' : req.body.password,
      'role' : req.body.role,
      'createdAt' : new Date(),
      'updatedAt' : new Date()
    })
    .then((data_user) => {
      res.render('login')
    })
  }
})

module.exports = router;
