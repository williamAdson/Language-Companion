const createError = require('http-errors');
const express = require('express');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const classesRouter = require('./routes/classes');
const studentsRouter = require('./routes/students');
const instructorsRouter = require('./routes/instructors');
const appointmentsRouter = require('./routes/appointments')

const app = express();

// database connection
mongoose.connect('mongodb://127.0.0.1:27017/yuxiaoban');
const db = mongoose.connection;
const async = require('async_hooks');

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.engine('hbs', hbs.create({
  extname: 'hbs',
  defaultLayout: 'main'
}).engine);
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// global variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.login_err = req.flash('login_err');
  next();
});
 
app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  if(req.user){
    res.locals.type = req.user.type;
  }
  next();
})

// system routes 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/classes', classesRouter);
app.use('/students', studentsRouter);
app.use('/instructors', instructorsRouter);
app.use('/appointments', appointmentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// user authentication test
function isUserAuthenticated(req, res, next){
  if(req.user){
    next();
  }else{
    res.redirect('/sign-up');
  }
}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

