// import necessary modules
const Courses = require('./../../models/classModel');
const Students = require('./../../models/studentModel');
const Instructor = require('./../../models/instructorModel');

function output(str){
    let result = {
        cov: '***************************',
        out: str,
        hov: '***************************'
    }
    return console.log(result);
}
function postCreateCourse(req, res, next){
    // 添加课程
    output(req.params.userID);
    try{
        let body = {}
        Object.assign(body, req.body);
        body.profile = {
            path: req.file.path.replace(/\\/g, "/"),
            img: req.file.filename
        }
        body.instructor = {
            name: req.body.userName,
            id: req.body.userID
        }
        
        if(body !== undefined || body !== {}){
            // POST request
            if(body.title == ""){ throw new Error('课程必须有标题'); }
            if(body.userName == ""){ throw new Error('课程必须有指导老师'); }
            Courses.createCourse(body, function(err, courseName){
                output(courseName);
                res.redirect(`/classes/view/${courseName._id}`);
            });
        }
    }catch(e){
        // GET request
        console.log(e);
        res.redirect(`/classes/instructors/create`);
    }
}
function getCreateCourse(req, res, next){
    const data = {
        instructorID : req.params.id
    }
    try{
        Instructor.viewSingleInstructor(data, function(err, teacher){
            res.render('classes/create', {
                title: '创建课程',
                user: teacher
            });
        })
    }catch(e){
        console.log(e);
        res.render(`/classes/${data['instructorID']}/home`)
    }
}

function viewCourse(req, res, next){
    // 观看一门课程
    try{
        const courseAccess = {
            id: req.params.courseID,
            userID: req.body.userID 
        }
        Courses.viewSingleCourse(courseAccess, function(err, courseName){
            if(err){ throw new Error('查看课程时遇到问题');}
            res.render('classes/view', 
                { 
                    title: courseName.title,
                    course: JSON.parse(courseName),
            });
        });
    }catch(e){
        console.log(e);
        res.redirect('/classes/create');
    }
}

function viewAllCourse(req, res, next){
    // 观看所有的课程
    try{
        Courses.viewAllCourses(function(err, courseName){
            if(err){ throw new Error('查看课程时遇到问题');}
            res.render('classes/view', 
                { 
                    title: '所有的课程',
                    course: courseName,
            });
        })
    }catch(e){

    }
}

function updateCourse(req, res, next){
    // 更新课程
    try{

    }catch(e){

    }
}

function deleteCourse(req, res, next){
    // 删除课程
    try{

    }catch(e){

    }
}

function searchCourse(req, res, next){
    // 搜索课程
    try{

    }catch(e){

    }
}

function certifyCourse(req, res, next){
    // 课程认证
    try{
        const data = {
            id: req.params.courseID,
            userType: req.params.userType
        }
        if(data.userType !== "instructor"){ 
            throw new Error('只有教师能认证课程'); 
        }
        Courses.setCourseStatus(data, function(err, courseName){
            res.redirect('/classes/view');
        })
    }catch(e){
        console.log(e);
        res.redirect(`/${userType}/classes/`)
    }
}

module.exports = {
    getCreateCourse: getCreateCourse,
    postCreateCourse: postCreateCourse,
    viewCourse: viewCourse,
    viewAllCourse: viewAllCourse,
    certifyCourse: certifyCourse,
    updateCourse,
    deleteCourse,
    searchCourse
}

// registering to course
// get course
// user keeps non-redundant course data
// course keeps non-redundant user data