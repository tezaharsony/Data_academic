const express = require('express')
const router = express.Router()

const model = require('../models')

router.use((req,res, next)=>{
  if(req.session.user.role == 'headmaster'){
    next();
  }else{
    res.send('You have to login as Headmaster');
  }
})

router.get('/', (req, res)=>{
  model.Teacher.findAll({
    order : [['first_name', 'ASC']]
  })
  .then(arrTeacher => {
    let promiseTeacher = arrTeacher.map(teacher => {
      return new Promise((resolve, reject) => {
        teacher.getSubject()
        .then(subject => {
          if(subject != null){
            teacher.subject = subject.subject_name;
          } else {
            teacher.subject = 'unassigned';
          }
          return resolve(teacher)
        })
        .catch(err => reject(err))
      })
    })
    
    Promise.all(promiseTeacher)
    .then(teacher => {
      // teacher.forEach(data_teachers => {
        // console.log(teacher);
        res.render('teachers', {data_teachers : teacher})
      // })
    })
    .catch(err => {
      console.log(err);
    })
  })
})

router.get('/add', (req, res, next) => {
  model.Subject.findAll()
  .then(data => {
    // console.log(data);
    res.render('add_teacher', {data_subjects : data, err:null })
  })
})


router.post('/add', (req, res, next) => {
    // model.Teacher.create(req.body //hanya req.body apabila penulisan nama & value di ejs sama dengan di db
    model.Teacher.create(
      {
      'first_name' : req.body.first_name,
      'last_name' : req.body.last_name,
      'email' : req.body.email,
      'SubjectId' : req.body.SubjectId
    }
    )
    .then((teacher) => {
      res.redirect('/teachers')
  })
  .catch((err)=>{
    res.render('add_teacher', {err:err.message});
  })
})


router.get('/edit/:id', function(req, res, next) {
  let id = req.params.id
    model.Teacher.findOne({ 
      where : {
        id : id
    }, 
    include : [model.Subject]})
    .then(data_teachers => {
      model.Subject.findAll()
      .then((data_subjects) => {
        res.render('edit_teacher', { data_teachers : data_teachers, data_subjects : data_subjects})
      })
    })
});

router.post('/edit/:id', function(req, res, next) {
  let id = req.params.id
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let email = req.body.email
  let SubjectId = req.body.SubjectId
  model.Teacher.findById(id)
  .then(data_teachers => {
    data_teachers.update({
      'first_name': first_name, 
      'last_name':last_name,
      'email':email,
      'SubjectId':SubjectId})
    .then(() => {
      res.redirect('/teachers')
    })
    .catch((err)=>{
      res.render('add_teacher', {err:err.message});
    })
  })
});




router.get('/delete/:id', function(req, res, next) {
  let id = req.params.id
  model.Teacher.destroy({
    where: {
      'id': id
    }
  })
  .then(() => {
    res.redirect('/teachers')
  })
});



module.exports = router;
