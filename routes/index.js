"use strict"

const express = require('express');
const router = express.Router();
const model = require('../models')

router.get('/', (req, res)=>{
  res.render('login', {title: 'Login'})
})


module.exports = router
