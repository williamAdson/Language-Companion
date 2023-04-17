// import module
const mongoose = require('mongoose');

// 课程数据模式
const classSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String},
    instructor: {
        name: { type: String },
        id: { type: mongoose.Schema.Types.ObjectId }
    },
    image: {
        path: { type: String },
        name: { type: String }
    },
    language: { type: String },
    status: { type: Boolean },
    views: { type: Number },
    peopleInCourse: { 
        user_id: { type: String },
        username: { type: String },
        allowed: { type: Boolean }
    },
    lessons: [{
        lesson_title: { type: String },
        lesson_id: { type: mongoose.Schema.Types.ObjectId }
    }]
}, { timestamps: true });

// 课程数据模型
const Class = module.exports = mongoose.model('classes', classSchema);

// 创建课程
module.exports.createCourse = function(data, callback){
    const newCourse = new Class({
        title: data['title'],
        description: data['desc'],
        instructor: data['instructor'],
        courseIMG: data['profile'],
        language: data['language']
    });
    newCourse.save(callback);
}
// 观看课程
module.exports.viewSingleCourse = function(id, callback){
    // 观看一门课程
    Class.findById(id, callback).lean();
}
module.exports.viewAllCourses = function(callback, limit){
    // 观看所有的课程
    Class.find(callback).sort({
        createdAT: 1
    }).limit(limit).lean();
}
module.exports.viewCertifiedCourses = function(limit, callback){
    // 观看所有的课程
    Class.find({
        $where: [
            { status: true },
        ]
    },callback).sort({
        createdAT: 1
    }).limit(limit).lean();
}
// 更新课程
module.exports.updateCourse = function(data, callback){

    const query = { _id: data.id };
    const id = data.id;
    Class.findByIdAndUpdate(id, {
        $push: { 
            'title': data.title,
            'description': data.desc,
            'language': data.lang
        }
    },
    {safe: true, upsert: true },
    callback);

}    
// 删除课程
module.exports.deleteCourse = function(id, callback){
    const query = { _id: id};
    Class.findOneAndRemove(query, callback);
}
// 搜索课程
module.exports.searchCourse = function(data, callback){
    const query = {};
    Class.find({
        $or: [
            { title: query },
            { instructorName: query }
        ]
    }, callback).lean();
}

// 管理员的课程认证
module.exports.certifyCourse= function(data, callback){
    // 管理员的课程认证
    const query = { _id: data.id };
    Class.findByIdAndUpdate(query, {
        $set: { status: true }
    },{ safe: true, upsert: true },
    callback).lean();
}

module.exports.updateCourseViews = function(data){
    let query = {_id: data.id}
    let update = data.views+1;
    Class.findByIdAndUpdate(query, {
        $set: { views: update }
    });
}
