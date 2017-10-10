"use strict"

const express = require('express');
const router = express.Router();
const model = require('../models')



router.get('/', (req, res)=>{
  model.Student.findAll()
  .then(students => {
  // res.send(teachers)
    res.render('student', {dataStudent: students, title:'Data Students'})
  })
  .catch(err =>{
    console.log(err);
  });
});

router.get('/add', (req, res)=>{
  model.Student.findAll()
  .then(student =>{
    res.render('studentAdd', {dataStudent: student, title: 'Add Student', err: false});
  })
  .catch(err =>{

    console.log(err);

  });
});

router.post('/add', (req, res)=>{
  model.Student.build({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  })
  .save().then((student)=>{
    res.redirect('/students')
  })
  .catch((err)=>{
    // res.send(err);
    res.render('studentAdd', {title:'Add Student', err: err})
  });
});

router.get('/edit/:id', (req,res)=>{
  model.Student.findAll({
    where: {id: req.params.id}
  })
  .then((student)=>{
    res.render('studentEdit', {dataStudent:student, title:'Edit Student'})
  })
  .catch((err)=>{
    res.send(err)
  })
})

router.post('/edit/:id', (req,res)=>{
  model.Student.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  },
  {
    where: {id:req.params.id}
  })
  .then(student=>{
    res.redirect('/students')
  })
  .catch((err)=>{
    res.send(err)
  })
})

router.get('/delete/:id', (req, res)=>{
  model.Student.destroy({
    where:{id:req.params.id}
  })
  .then((student)=>{
    res.redirect('/students')
  })
  .catch((err)=>{
    res.send(err)
  })
})

//associate
router.get('/:id/addsubject', (req, res)=>{
  model.Student.findAll({
    where: {id: `${req.params.id}`}
  })
  .then(student => {
    model. Subject.findAll()
    .then(subject => {
      res.render('studentAddSubject', {dataStudent: student, dataSubject: subject, title: 'Add Subject'})
    })
    .catch(err =>{
      console.log(err);
    })
  })
  .catch(err => {
    console.log(err);
  })
})

router.post('/:id/addsubject', (req, res)=>{
  model.SubjectStudent.create({
    StudentId: `${req.params.id}`,
    SubjectId: `${req.body.SubjectId}`,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(student => {
    res.redirect('/students')
    // res.send(student)
  })
  .catch(err=> {
    console.log(err);
  })
})

module.exports = router
