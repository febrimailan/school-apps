"use strict"

const express = require('express');
const router = express.Router();
const model = require('../models');

const crypto = require('crypto');

const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');


function checkin(req, res, next) {
  model.User.findAll({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  })
  .then(user =>{
    if(user.length > 0) {
      req.session.username = user[0].username
      next();
    } else {
      res.redirect('/')
    }

  })
  .catch(err =>{
    console.log(err);
  })
}

// router.get('/', (req,res) =>{
//   res.render('login', {title: 'Login', err: false})
// })

router.post('/', checkin,(req, res)=>{
    res.render('index', {title: 'Login', err: false})


})



// router.post()


module.exports = router
