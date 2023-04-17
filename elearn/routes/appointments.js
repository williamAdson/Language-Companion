// import modules
const express = require('express');
const router = express.Router();

// import data model
const Students = require('./../models/studentModel');

// appointments index route
router.get('/', async function(req, res, next){
    // make appointment options logic
    try{
        const email = req.user.email;
        const student = await Students.findOne({email: email});
        res.render('appointments/index', {
            title: student.title,
            user: student
        })

    }catch(e){
        console.log('MAKE APPOINTMENT NOT LOADED: '+e);
        res.redirect('/');
    }
})



// export router
module.exports = router;