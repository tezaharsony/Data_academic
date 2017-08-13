const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const index = require('./routes/index');
const teachers = require('./routes/teachers')
const subjects = require('./routes/subjects')
const students = require('./routes/student')
const user = require('./routes/register')

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')))
const session = require('express-session')

app.use(session({
  secret:'teza',
  resave : false,
  saveUninitialized : true
  // cookie : { secure : true }
}))

app.use('/register', user);
app.use('/', index)

app.use((req, res, next) => {
  if(req.session.user){
    next();
  }else{
    res.render('login', {msg : 'Please login first'})
  }
})

app.use('/teachers', teachers);
app.use('/subjects', subjects);
app.use('/students', students);


//app.listen(3000)
app.listen(process.env.PORT || 3000);
