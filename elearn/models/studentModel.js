// import necessary modules
const mongoose = require('mongoose');

// create student schema
const studentSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    address: {
        street_address: { type: String },
        city: { type: String },
        province: { type: String },
        zip: { type: String }
    },
    username: { type: String },
    email: { type: String, unique: true},
    classes: [{
        class_id: {type: mongoose.Schema.Types.ObjectId},
        class_title: { type: String }
    }],
    appointments: [{
        appointment_id: { type: String},
        appointment_tutor: { type: String },
        appointment_date: { type: String },
        appointment_time: { type: String },
        appointment_location: { type: String }
    }]
});

// create student model
const Student = module.exports = mongoose.model('students', studentSchema)

// get student by username
module.exports.getStudentByUsername = function(username, callback){
    let query = { username: username};
    Student.findOne(query, callback).lean();
}

// view single student
module.exports.viewSingleStudent = function(email, callback){
    let query = { email: email}
    Student.findOne(query, callback).lean();
}
// register student to class
module.exports.registerStudentToClass = function(info, callback){
    let student_username = info['student_username'];
    let class_id = info['class_id'];
    let class_title = info['class_title'];

    let query = { username: student_username };
    Student.findOneAndUpdate(query,
        {$push: {'classes': {'class_id': class_id, 'class_title': class_title}}},
        {safe: true, upsert: true },
        callback
        );
}
// unregister student from class
module.exports.registerStudentToClass = function(info, callback){
    let student_username = info['student_username'];
    let class_id = info['class_id'];
    let class_title = info['class_title'];

    let query = { username: student_username };
    Student.findOneAndDelete(query,
        {$push: {'classes': {'class_id': class_id, 'class_title': class_title}}},
        {safe: true, upsert: true },
        callback
        );
}

// save appointments to student
module.exports.saveStudentAppointment = function(info, callback){
    let student_username = info['student_username'];
    let class_id = info['class_id'];
    let class_title = info['class_title'];

    let query = { username: student_username };
    Student.findOneAndUpdate(query,
        {$push: {'appointments': {'class_id': class_id, 'class_title': class_title}}},
        {safe: true, upsert: true },
        callback
        );
}

// update student account profile
module.exports.updateStudentAccount = async function(id, data, callback){
    const studentUpdate = await Student.findById(id);
    Object.assign(studentUpdate, data);
    studentUpdate.save(callback);
}

// 学生课程报名
module.exports.subscribeCourses = function(data, callback){
    
}

// 学生课程退休
module.exports.unsubscribeCourses = function(data, callback){}