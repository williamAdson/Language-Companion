// import module
const mongoose = require('mongoose');

// tutor schema
const tutorSchema = new mongoose.Schema({
    name: { type: String},
    age: { type: String},
    gender: { type: String},
    appointments: [{
        appointment_id: { type: String},
        appointment_student: { type: String },
        appointment_date: { type: String },
        appointment_time: { type: String },
        appointment_location: { type: String }
    }]
}, { timestamps: true });

// tutor model
const Tutor = module.exports = mongoose.model('tutors', tutorSchema);

// fetch all tutors
module.exports.getTutors = function(callback, limit){
    Tutor.find(callback).limit(limit);
}

// fetch single tutor
module.exports.getTutorById = function(id, callback){
    Tutor.findById(id, callback).lean();
}