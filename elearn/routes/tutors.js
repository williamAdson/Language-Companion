// import modules
const express = require('express');
const router = express.Router();

// user, instructor, appointment models
const Student = require('./../models/studentModel.js');
const Tutor = require('./../models/tutorModel.js');
const Appointment = require('./../models/appointmentModel.js');

// tutor routes
router.get('/', function(req, res, next){
    // tutor home logic
});

// export tutor router
module.exports = router