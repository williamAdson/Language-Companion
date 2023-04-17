// import modules
const express = require('express');
const router = express.Router();

// class model
const Courses = require('./../models/classModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  try{
      Courses.viewAllCourses(function(err, courseName){
        if(err){ throw new Error('COURSES NOT FOUND: '+err); }
        res.render('index', { 
          title: '首页', 
          Class: courseName
        });
      }, 3);
  }catch(e){
    console.log(e)
    res.render('index', { 
      title: '首页'
    });
  }

});

router.get('/about', function(req, res, next){
  res.render('about', {
    title: '关于我们'
  });
});

router.get('/account', function(req, res, next){
  res.render('account', {
    title: '账户'
  });
});

router.post('/contact', function(req, res, next){
  console.log(req.body);
  res.redirect('/');
});

router.get('/sign-up', function(req, res, next){
  res.render('users/register');
});

module.exports = router;
