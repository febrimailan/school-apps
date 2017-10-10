"use strict"

const express = require('express');
const router = express.Router();
const model = require('../models')

router.get('/', (req, res)=>{
  model.Subject.findAll({
    include: [{model:model.Teacher}]
  })
  .then(subjects => {
  // res.send(teachers)
    res.render('subject', {dataSubject: subjects, title:'Data Subject'})
  })
  .catch(err =>{
    console.log(err);
  });
});

router.get('/add', (req, res)=>{
  model.Subject.findAll()
  .then(subject =>{
    res.render('subjectAdd', {dataSubject: subject, title: 'Add Subject'})
  })
  .catch(err =>{
    console.log(err);
  });
});

router.post('/add', (req,res)=>{
  model.Subject.build({
    subject_name: req.body.subject_name
  })
  .save().then((subject)=>{
    res.redirect('/subjects')
  })
  .catch((err)=>{
    res.render('subjectAdd', {title: 'Add Subject'})
  });
});

router.get('/edit/:id', (req,res)=>{
  model.Subject.findAll({
    where: {id:req.params.id}
  })
  .then((subject)=>{
    res.render('subjectEdit', {dataSubject:subject, title:'Edit Subject'});
  })
  .catch((err)=>{
    res.send(err)
  });
});


router.post('/edit/:id', (req,res)=>{
  model.Subject.update({
    subject_name: req.body.subject_name
  },
  {
    where: {id:req.params.id}
  })
  .then(subject=>{
    res.redirect('/subjects')
  })
  .catch((err)=>{
    console.log(err);
  });
});

router.get('/delete/:id', (req,res)=>{
  model.Subject.destroy({
    where: {id:req.params.id}
  })
  .then((subject)=>{
    res.redirect('/students')
  })
  .catch((err)=>{
    res.send(err)
  });
});

//enroll
router.get('/:id/enrolledstudents', (req, res)=>{
  model.Subject.findAll({
    where: {
      id: `${req.params.id}`
    },
    include: [
      {model: model.Student}
    ]
  })
  .then(dataSubject => {
    if(dataSubject[0].Student.length > 0) {
      let count = 0;
      dataSubject[0].Student.map(student => {
        student.setDataValue('scoreLetter', studen.SubjectStudent.score)
        count++
        if(count >= dataSubject[0].Student.length){
          res.render('subjectEnrolledStudent', {dataSubject: dataSubject[0], title: 'Enrolled Student', session: req.session})

        }
      })
    } else {
      res.redirect('/subjects')
    }
  })
  .catch(err => {
    console.log(err);
  })
})

//score
router.get('/:id/givescore', (req,res)=>{
  model.SubjectStudent.findAll({
    where: {id: `${req.params.id}`},
    include:[{model: model.Student}, {model: model.Subject}]
  })
  .then(dataConjunction => {
    res.render('givescore', {dataConjunction: dataConjunction, title: 'Give Score'})
  })
  .catch(err => {
    console.log(err);
  })
})

router.post('/:id/givescore', (req, res)=>{
  model.SubjectStudent.update({
    score: `${req.body.score}`
  },
  {where: {id: `${req.params.id}`}
  })
  .then(dataConjunction => {
    res.redirect('/subjects')
  })
  .catch(err=> {
    console.log(err);
  })
})

module.exports = router
