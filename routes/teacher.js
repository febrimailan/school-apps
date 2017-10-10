"use strict"

const express = require('express');
const router = express.Router();
const model = require('../models')

router.get('/', (req, res)=>{
  model.Teacher.findAll({
    include: [{model: model.Subject}]
  })
  .then(teachers => {
  // res.send(teachers)
    res.render('teacher', {dataTeacher: teachers, title:'Data Teacher'})
  })
  .catch(err =>{
    console.log(err);
  });
});

router.get('/add', (req,res)=>{
  model.Teacher.findAll({
    attributes: {exclude: ['SubjectId', 'TeacherId']}
  })
  .then(teacher =>{
    res.render('teacherAdd', {dataTeacher: teacher, title: 'Add Teacher', err:false})
  })
  .catch(err =>{
    console.log(err);
  });
});

router.post('/add', (req, res)=>{
  model.Teacher.build({
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email: req.body.email,
    SubjectId: `${req.body.SubjectId}`
  })
  .save().then((teacher)=>{
    res.redirect('/teachers')
  })
  .catch((err)=>{
    res.render('teacherAdd', {title:'Add Teacher', err: err})
  });
});

router.get('/edit/:id', (req, res)=>{
  model.Teacher.findAll({
    where: {id: `${req.params.id}`}
  })
  .then(teacher=>{
    model.Subject.findAll()
    .then(subject => {
      res.render('teacherEdit', {dataTeacher: teacher[0], DataSubject: subject, title: 'Edit Teacher'})
    })
    .catch(err => {
      console.log(err);
    })
  })
  .catch((err)=>{
    res.send(err)
  });
});

router.post('/edit/:id', (req,res)=>{
  model.Teacher.update({
    first_name: `${req.body.first_name}`,
    last_name: `${req.body.last_name}`,
    email: `${req.body.email}`,
    SubjectId: `${req.body.SubjectId}`
  },
  {
    where: {id: `${req.params.id}`}
  })
  .then(teacher =>{
    res.redirect('/teachers')
  })
  .catch((err)=>{
    res.send(err)
  });
});

router.get('/delete/:id', (req,res)=>{
  model.Teacher.destroy({
    where: {id:req.params.id}
  })
  .then((teacher)=>{
    res.redirect('/teachers')
  })
  .catch((err)=>{
    res.send(err)
  });
});

module.exports = router
