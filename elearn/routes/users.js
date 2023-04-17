// import necessary modules
const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressValidator = require('express-handlebars');
const { check, validationResult } = require('express-validator');

// include models: User, Student, Instructor
const User = require('./../models/userModel');
const Student = require('./../models/studentModel');
const Instructor = require('./../models/instructorModel');

// passport authentication strategy
passport.use(new LocalStrategy(
  function(username, password, callback){
    console.log('started processing login...')
    User.getUserByUsername(username, function(err, user){
      if(err){ throw new Error(err); }
      if(!user){
        console.log('user not found')
        return callback(null, false, { message: 'User not found: '+username});
      }
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err){ return callback(err); }
        if(isMatch){
          console.log('Logged In');
          return callback(null, user, { message: 'User logged in: '+username });
        }else{
          console.log('Incorrect Password!');
          return callback(null, false, { message: 'Incorrect Password'})
        }
      });
    });
  }
));

// passport serialize and deserializing of users
passport.serializeUser(function(user, callback){
  callback(null, user._id);
})
passport.deserializeUser(function(id, callback){
  User.getUserById(id, function(err, user){
    callback(err, user);
  });
})

// register user 
router.post('/signup',
  check('username', 'Username field is required!').not().isEmpty(),
  check('email', 'Email must be a valid email address!').isEmail(),
  check('password', 'Password is required!').not().isEmpty(),
  check('password2').custom((value, {req})=>{
    if(value !== req.body.password){
      throw new Error('Passwords do not match!');
    }
    return true
  })
,
  function(req, res, next){
  // check errors
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    console.log('*** sorry!!! another snag ***');
    console.log(errors);
    res.render('users/register', { errors: errors.array()});
  }else{ 
    // ***** begin user registration process *****
    console.log('registering user!')
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      type: req.body.accountType
    });
    if(req.body.accountType == 'student'){
      console.log('registering student!');

        const newStudent = new Student({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address: [{
            street_address: req.body.streetAddress,
            city: req.body.city,
            province: req.body.province,
            zip: req.body.zip
          }],
          email: req.body.email,
          username: req.body.username
        });
        User.saveStudent(newUser, newStudent, function(err, user){
          if(err){ return next(err); }
          console.log('Student created!');
        });

    }else{
      console.log('registering instructor!');

        const newInstructor = new Instructor({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address: [{
            street_address: req.body.streetAddress,
            city: req.body.city,
            province: req.body.province,
            zip: req.body.zip
          }],
          email: req.body.email,
          username: req.body.username
        });
        User.saveInstructor(newUser, newInstructor, (err, user)=>{
          if(err){ return next(err); }
          console.log('Instructor created!');
      });
    }
    // redirect to dashboard
    req.flash('success_msg', 'User has been added successfully!');
    res.redirect('/');
    //***** end user registration process *****
  }

});

router.get('/signup', function(req, res, next) {
  res.render('users/register', {title: 'Signup User!'});
});

router.post('/login',passport.authenticate('local', {
  failureRedirect: '/',
  failureFlash: true
}), function(req, res, next){
  const userType = req.user.type;
  req.flash('login_err', 'You are now logged in');
  res.redirect('/'+userType+'s'+'/classes');
});

router.get('/logout', function(req, res, next){

  if(req.user){
    req.flash('success_msg', 'You have logged out!');
    req.session.destroy();
    res.redirect('/');
  }else{
    res.redirect('/');
  }
  
});

// user dashboard
router.get('/dashboard', function(req, res, next){
  let userType = req.user.type;
  let user = req.user;
  res.render('users/index', {
    title: userType+"s dashboard", user: user
  });
});

module.exports = router;
