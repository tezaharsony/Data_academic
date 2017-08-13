const express = require('express')
const router = express.Router()

const model = require('../models')

router.use((req,res, next)=>{
  if(req.session.user.role == 'academic' || req.session.user.role == 'headmaster' || req.session.user.role == 'teacher'){
    next();
  }else{
    res.send('You have to login as Headmaster or Academic Coordinator');
  }
})

router.get('/', (req, res, next)=>{
  model.Student.findAll({
    order : [['first_name', 'ASC']]
  })
  .then(data =>{
    res.render('students', {data_students : data})
  })
})

router.get('/add', (req, res, next) => {
  model.Student.findAll()
  .then(data => {
    res.render('add_student', {data_student : data, err:null })
  })
})


//Perbedaan Penggunaan req.body dengan yang di atas
router.post('/add', (req, res, next) => {
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let email = req.body.email
  let jurusan = req.body.jurusan
    model.Student.create(
      {
      'first_name':first_name,
      'last_name':last_name,
      'email':email,
      'jurusan': jurusan
      }
    )
    .then((student) => {
      res.redirect('/students')
  })
  .catch((err)=>{
    res.render('add_student', {errMsg :err.message});
  })
})

router.get('/edit/:id', function(req, res, next) {
  let id = req.params.id
    model.Student.findOne({ where: {id : id}}).then(data_student => {
      res.render('edit_student', { data_student : data_student})
    })
});

router.post('/edit/:id', function(req, res, next) {
  let id = req.params.id
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let email = req.body.email
  let jurusan = req.body.jurusan
  model.Student.findById(id)
  .then(data_student => {
    data_student.update({
      'first_name': first_name, 
      'last_name':last_name,
      'email':email,
      'jurusan':jurusan})
    .then(() => {
      res.redirect('/students')
    })
    .catch((err)=>{
      res.render('add_student', {err:err.message});
    })
  })
});


router.get('/delete/:id', function(req, res, next) {
  let id = req.params.id
  model.Student.destroy({
    where: {
      'id': id
    }
  })
  .then(() => {
    model.StudentSubject.destroy({
      where : {
        StudentId : id
      }
    })
    .then(() => {
      res.redirect('/students')
    })
  })
});


router.get('/:id/addsubject', function(req, res, next){
  let id = req.params.id
  model.Student.findOne({
    where : {id : id}
  })
  .then(student => {
  model.Subject.findAll()
  .then(data_subjects => {
      // console.log(JSON.stringify(data_subjects, null, 2));
      res.render('add_subject', { student : student, data_subjects : data_subjects})
    })
  })
})

router.post('/:id/addsubject', function(req, res, next) {
  model.StudentSubject.create({
      StudentId: req.params.id,
      SubjectId: req.body.SubjectId, 
      createdAt: new Date(),
      updatedAd: new Date()
    })
    .then(() => {
      res.redirect('/students')
    })
    .catch((err)=>{
      res.render('add_student', {err:err.message});
    })
  })
  

module.exports = router;
