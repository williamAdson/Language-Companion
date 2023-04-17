const StudentOnly = function(req, res, next){
    const userRole = res.locals.type;
    if(userRole == "student"){
        next();
    }
    res.redirect('/');
}

const StudentAndInstructors = function(req, res, next){
    const userRole = res.locals.type;
    if(userRole == "student" || userRole == "Instructor"){
        next();
    }
    res.redirect('/');
}

const InstructorOnly = function(req, res, next){
    const userRole = res.locals.type;
    if(userRole == "student"){
        next();
    }
    res.redirect('/');
}

const UsersOnly = function(req, res, next){
    const userRole = res.locals.type;
    if(!userRole){
        res.redirect('/');
    }
    next();
}

module.exports = {
    StudentOnly,
    StudentAndInstructors,
    InstructorOnly,
    UsersOnly
}