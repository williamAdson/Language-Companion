// import modules
const mongoose = require('mongoose');

// create appointment schema
const appointmentSchema = new mongoose.Schema({
    Student: {
        name: { type: String }
    },
    Tutor: {
        name: { type: String }
    },
    Time: {
        date: { type: String },
        clock: { type: String }
    },
    Place: {
        location: { type: String },
        day: { type: String }
    },
    Subjects: {
        speaking: { type: Number },
        listening: { type: Number },
        writing: { type: Number },
        reading: { type: Number }
    },
    TotalSubjects: {
        type: Number
    },
    Language: {
        type: String
    }
}, { timestamps: true} );

// 预约数据模型
const Appointment = module.exports = mongoose.model('appointments', appointmentSchema);

// 寻找预约
module.exports.makeAppointment = function(data, callback){
    const studentName = {
        name: data['userName']
    }
    const tutorName = {
        name: data['matchName']
    }
    const dateName = {
        date: data['dateName'],
        clock: data['dateTime']
    }
    const locationName = {
        location: data['dayLocation'],
        day: data['dayName']
    }
    const speakingName = {
        speaking: data['subSpeak'],
        listening: data['subListen'],
        writing: data['subWrite'],
        reading: data['subRead']
    }
    const numOfSubjects = data['subSpeak']+data['subListen']+data['subWrite']+data['subRead'];
    
    const appointed = new Appointment({
        Student: studentName,
        Tutor: tutorName,
        Time: dateName,
        Place: locationName,
        Subjects: speakingName,
        TotalSubjects: numOfSubjects
    })
    appointed.save(callback);
}
// 观看预约
module.exports.viewSingleAppointment = function(data, callback){
    // 观看预约
    const query = { _id: data.id };
    Class.findById(query, callback).lean();
}
module.exports.viewAllAppointments = function(limit, callback){
    // 观看所有的预约
    Class.find({
        $where: [
            { status: true },
        ]
    },callback).sort({
        createdAT: 1
    }).limit(limit).lean();
}

// 取消预约
module.exports.cancelAppointment = function(data, callback){
    const query = { _id: data['appointedID']};
    Class.findOneAndRemove(query, callback);
}
