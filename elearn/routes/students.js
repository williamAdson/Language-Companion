const express = require('express');
const router = express.Router();

// custom client models
const Class = require('./../models/classModel');
const Student = require('./../models/studentModel');
const User = require('./../models/userModel');
const userAuthentication = require('./../lib/userAuthorization');

// appointments model
// appointments algorithm
const matchAlgorithm = require('./../lib/nearestNeighbor');

// appointment global variables
router.use(function(req, res, next){
    res.locals.myAppointmentMatches = [];
    next();
});

// student routes
router.get('/classes',userAuthentication.StudentOnly, 
function(req, res, next){
    Student.getStudentByUsername(req.user.username, function(err, student){
        if(err){ throw new Error(err); }
        res.render('students/classes', {
            student: student
        });
    });
});

// register student to course
router.post('/classes/register', function(req, res, next){
    let info = [];
    info['student_username'] = req.user.username;
    info['class_id'] = req.body.class_id;
    info['class_title'] = req.body.class_title;

    Student.registerStudentToClass(info, function(err, student){
        if(err){ throw new Error(err); }
        console.log("Student registered!");
    });

    req.flash('success_msg', 'You are now registered to learn this class!');
    res.redirect('/students/classes');
});

// update student account
router.get('/:username/update-profile', userAuthentication.StudentOnly, 
function(req, res){
    const name = req.params.username;

    Student.getStudentByUsername(name, function(err, studentInformation){
        if(err) throw new Error('You messed up man!');
        res.render('students/update.hbs', { student: studentInformation});
    });

});

router.post('/:id/update-profile', function(req, res, next){
    const id = req.params.id;

    let updates = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username
    }
    updates.address.street_address = req.body.streetAddress;
    updates.address.city = req.body.city;
    updates.address.province = req.body.province;
    updates.address.zip = req.body.zip;

    console.log('***** student updates *****');
    console.log(updates);
    console.log('***** end *****');

    Class.updateStudentAccount(updates, function(err, accountUpdate){
        if(err){ throw new Error(err); }
        console.log(accountUpdate);
        res.redirect('students/'+accountUpdate.username+'/update-profile');
    });
    
});

// STUDENT APPOINTMENTS

router.post('/appointment/result', matchAlgorithm, function(req, res, next){
    // result appointment logic route
    res.redirect('/students/appointment/result');
})
router.get('/appointment/result', function(req, res, next){
    // result appointment logic route
    try{
        const email = req.user.email;
        const appointmentMatch = req.cookies.listOfMatches;
        console.log('**** appointmentMatch results ****');
        console.log(appointmentMatch);
        let matchList = [];
        for(let i = 0; i < appointmentMatch.length; i++){
            for(let j = 0; j < appointmentMatch[i].length; j++){
                matchList.push(appointmentMatch[i][j]);
            }
        }
        console.log('**** matchList results ****');
        console.log(matchList);

        const matched = matchList.map(element=>{
            return this.push(element);
        });

        console.log('**** matched results ****');
        console.log(matched)
        Student.viewSingleStudent(email, function(err, studentName){
            if(err){ throw new Error('student not found!'+err); }
            res.render('appointments/confirm', {
                title: '确认预约',
                user: studentName,
                userMatch: matched
            });
        });

    }catch(e){
        console.log("GET STUDENT ERROR: "+e);
        res.redirect('/appointments/');

    }
})

router.get('/appointment/confirm', function(req, res, next){
    // confirm result logic route
})
// export student router
module.exports = router