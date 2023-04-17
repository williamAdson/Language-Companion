// import necessary modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const async = require('async');

// create user schema
const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, unique: true },
    password: {
        type: String,
        bcrypt: true
    },
    type: { type: String }
});

// create user model
const User = module.exports = mongoose.model('users', userSchema);

// fetch user by Id
module.exports.getUserById = function(id, callback){
    User.findById(id, callback).lean();
}

// fetch user by username
module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback).lean();
}

// compare user passwords
module.exports.comparePassword = function(inputPassword, hash, callback){
    bcrypt.compare(inputPassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
}

// create student user
module.exports.saveStudent = function(newUser, newStudent, callback){
    const salt = 10;
    bcrypt.hash(newUser.password, salt, async function(err, hash){
        if(err) throw err;
        // hash student password
        newUser.password = hash;
        let stack = [];
        let firstUser = (callback)=>{
            newUser.save(function(err, user){
                if(err){ callback(err); }
                callback(null, user);
            });
        }
        let secondUser = (callback)=>{
            newStudent.save(function(err, user){
                if(err){ callback(err); }
                callback(null, user);
            });
        }

        stack.push(firstUser);
        stack.push(secondUser);

        console.log('processing student...');
        async.parallel(stack, callback);
    });
}

// create instructor user
module.exports.saveInstructor = async function(newUser, newInstructor, callback){
    const salt = await bcrypt.genSalt(10);
    await bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){ return console.log(err); };
        // hash instructor password
        newUser.password = hash;
        let stack = [];
        let firstUser = (callback)=>{
            newUser.save(function(err, user){
                if(err){ callback(err); }
                callback(null, user);
            });
        }
        let secondUser = (callback)=>{
            newInstructor.save(function(err, user){
                if(err){ callback(err); }
                callback(null, user);
            });
        }

        stack.push(async.reflect(firstUser));
        stack.push(async.reflect(secondUser));

        console.log('processing instructor...');
        async.parallel(stack, callback);
    });
}