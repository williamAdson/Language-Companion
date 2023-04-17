// import modules
const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '/uploads');
    },
    filename: function(req, file, cb){
        cb(null, 'YXB'+Date.now()+'IMG'+file.originalname);
    }
});

// class model
const Courses = require('./../models/classModel');

// images middleware
const uploads = multer({
     storage: storage,
     limits: { fileSize: 5 * 1024 * 1024, files: 1}
}).single('profile');

// view all classes route
router.get('/', function(req, res,next){
    res.redirect('/classes/view');
});

router.get('/view', function(req, res,next){
    Courses.viewAllCourses(function(err, courseName){
        if(err){ throw new Error('COURSES NOT FOUND: '+err); }
        res.render('classes/index', {
            title: '所有的课程',
            Class: courseName
        });
    });
});

// 观看一门课程
router.get('/view/:id', function(req, res, next){
    try{
        const id = req.params.id;
        let data = {
            id: id
        } 
        Courses.viewSingleCourse(id, function(err, className){
            if(err){ throw new Error('VIEWING COURSE ERRROR: '+err); }
            data.views = className.views + 1;
            Courses.updateCourseViews(data);
            res.render('classes/view', {
                title: className.title,
                course: className
            });
        });
    }catch(e){
        console.log('VIEW COURSE FAILED: '+e);
        global.history.go(-1);
    }
});
router.post('/view/:id/certify', function(req, res, next){
    // 01: get course
    // 02: check if course instructor == course certifier
    // 03:      certify course
    // 04: else
    // 05:      certify failed
    const body = req.body;
    console.log(body);
    res.redirect('/classes/view');
})
// 管理课程认证

// export course module
module.exports = router;