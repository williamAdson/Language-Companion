// import algo auxiliary modules
const _ = require('lodash');
// import dataset
const tutorDataset = require('./../lib/tutorDataset');
// import predictionUser

const appointmentMatches = function(req, res, next){
    function distance(USER){
        /* distance is measured according to the similarities in subjects
        ** if users have all subjects in common then the distance is 0
        ** if users have no subjects in common the distance is 4
        ** USER represents neighbor dataset
        ** point represents neighbor similarities in subjects
        */
        let point = 4;
        for(let i = 0; i < USER.subjects.length; i++){
            // loop through users dataset
            for(let j = 0; j < predictionUser.subjects.length; j++){
                // loop through match object
                if(i === j){
                    // if index of dataset equals index of match
                    if(USER.language === predictionUser.language){
                        // if user and match interest are aligned
                        if(USER.subjects[i] == 1 && predictionUser.subjects[j] == 1){
                            point = point - 1;
                        }
                    }
                }
            } // end of prediction distance loop
    
        } // end point distance loop
        USER.distance = point;
        return USER.name
    }
    // dataset
    const outputs = tutorDataset;
    // prediction point data
    const body = req.body;
    console.log(body);
    let predictionUser = {
        name: req.user.email,
        language: body.english || body.chinese,
        subjects: [0, 0, 0, 0]
    }
    const trackLanguage = function(){
        if(body.english == 'on'){
            predictionUser.language = 'english'
        }else{
            predictionUser.language = 'chinese'
        }
    }
    trackLanguage();
    const trackSubjects = function(){
        if(body.speak){
            predictionUser.subjects[0] = 1
        }
        if(body.listen){
            predictionUser.subjects[1] = 1
        }
        if(body.read){
            predictionUser.subjects[2] = 1
        }
        if(body.write){
            predictionUser.subjects[3] = 1
        }
    }
    trackSubjects();
    const k = 3;
    let match = _.chain(outputs)
        .map( row => [ distance(row), row, row['distance']] )
        .sortBy(row => row[2] )
        .slice(0, k)
        .value()

    try{
        res.cookie.userMatches = match;
    }catch(e){
        console.log('failed to make cookie: '+e);
        next();
    }
}
module.exports = appointmentMatches;