const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/uploads');
    },
    filename: function(req, file, cb){
        cb(null, 'YXB'+Date.now()+'IMG'+file.originalname);
    }
});


// custom client models
const Instructor = require('./../models/instructorModel');
const Courses = require('./../models/classModel');

// images middleware
const uploads = multer({
    storage: storage,
    limits: { fileSize: 30 * 1024 * 1024, files: 1}
}).single('profile');

// instructor home 
router.get('/', function(req, res, next){
    res.redirect('/instructors/account');
})
router.get('/account', function(req, res, next){
    Instructor.viewSingleInstructor(req.user._id, function(err, teacher){
        res.render('home', {
            title: '教师表板',
            user: teacher
        });
    });
});

// instructor routes
router.get('/classes', function(req, res, next){
    console.log(req.user);
    Instructor.getInstructorByUsername(req.user.username, function(err, instructor){
        if(err){ throw new Error(err); }
        res.render('instructors/classes', { 
            instructor: instructor 
        });
    });
});

// register instructor to class
router.post('/classes/register', function(req, res, next){
    let info = [];
    info['instructor_username'] = req.user.username;
    info['class_id'] = req.body.class_id;
    info['class_title'] = req.body.class_title;

    Instructor.registerInstructorForClass(info, function(err, instructor){
        if(err){ throw new Error(err); }
        console.log("Instructor registered!");
    });

    req.flash('success_msg', 'You are now registered to teach this class!');
    res.redirect('/instructors/classes');
});

// 教师创建课程
router.get('/classes/create', function(req, res, next){
    try{
        let email = req.user.email;
        Instructor.viewSingleInstructor(email, function(err, teacher){
            if(err){ throw new Error(err); }
            res.render('classes/create',{
                title: '创建课程 ',
                user: teacher
            });
        })
        
    }catch(e){
        console.log(e);
    }
});
router.post('/classes/create', uploads, function(req, res, next){
    try{
        const body = req.body;
        let data = {}
        Object.assign(data, body);
        data.instructor = {
            name: body.userName,
            id: body.userID
        }
        data.image = {
            path: req.file.path,
            name: req.file.originalname
        }
        data.views = 0;
        Courses.createCourse(data, function(err, className){
            if(err){ throw new Error('course creation failed! '+err); }       
            res.render('classes/view', {
                title: className.title,
                user: className,
                instructor: true
            });
        });
        
    }catch(e){
        console.log(e);
        res.redirect('/instructors/classes/create');
    }
});
router.post('/classes/delete/:id', function(req, res, next){
    // delete course logic route
    try{
        const id = req.params.id;

        Courses.deleteCourse(id, function(err, courseName){
            if(err){ throw new Error('DELETING COURSE ERROR: '+err); }
            res.redirect('/classes/view');
        });
    }catch(e){
        console.log('DELETE COURSE FAILED: '+e);
        global.history.go(-1);
    }
})
router.get('/classes/update/:id', function(req, res, next){
    try{
        const id = req.params.id;

        Courses.viewSingleCourse(id, function(err, courseName){
            if(err){ throw new Error('VIEWING COURSE ERROR: '+err); }
            res.render('classes/update', {
                title: courseName.title,
                course: courseName
            });
        })
    }catch(e){
        console.log('UPDATE COURSE: '+e);
        global.history.go(-1);
    }
});
router.post('/classes/updated', function(req, res, next){
    // update course logic route
    try{
        const body = req.body;
        let data = {
            id: body.courseID
        };
        if(body.title !== "" && body.title !== undefined ){
            data.title = body.title;
        }
        if(body.desc !== "" && body.desc !== undefined ){
            data.desc = body.desc;
        }
        if(body.lang !== "" && body.lang !== undefined ){
            data.lang = body.lang;
        }
        console.log("*** updating data below ***");
        console.log(data);
        Courses.updateCourse(function(err, courseName){
            if(err){ throw new Error('UPDATING COURSE ERROR: '+err); }
            res.render('classes/view',{
                title: courseName.title,
                course: courseName
            });
        });
    }catch(e){
        console.log('UPDATE COURSE FAILED: '+e);
        global.history.go(-1);
    }
});

// export instructor router
module.exports = router