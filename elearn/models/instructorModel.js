// import necessary modules
const mongoose = require('mongoose');

// create instructor schema
const instructorSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    address: [{
        street_address: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String }
    }],
    username: { type: String },
    email: { type: String, unique: true },
    myCourses: [{
        id: { type: mongoose.Schema.Types.ObjectId},
        title: { type: String }
    }],
    classAuthor: [{
        class_id: { type: mongoose.Schema.Types.ObjectId},
        class_title: { type: String } 
    }]
});

// create instructor model
const Instructor = module.exports = mongoose.model('instructors', instructorSchema);

// view single instructor
module.exports.viewSingleInstructor = function(email, callback){
    let query = { email: email}
    Instructor.findOne(query, callback).lean();
}
// get instructor by username
module.exports.getInstructorByUsername = function(username, callback){
    let query = { username: username};
    Instructor.findOne(query, callback).lean();
}

// register instructor course
module.exports.courseRegistrationInstructor = function(data, callback){
    const userID = data[instructor].id;
    const classID = data[_id];
    const classTitle = data[title];

    let query = { _id: userID };
    Instructor.findOneAndUpdate(query,
        {$push: {'myCourses': {'id': classID, 'title': classTitle}}},
        {safe: true, upsert: true },
        callback
        );
}

// add created course to courses
module.exports.coursesAuthoredByMe = function(data, callback){
    let query = { _id: data['instructorID']};
    Instructor.findOneAndUpdate(query,{
        $push: { 'classAuthor': 
        { 'class_id': data['class_id'], 'class_title': data['class_title']}}
    },{ safe: true, upsert: true }, callback)
}