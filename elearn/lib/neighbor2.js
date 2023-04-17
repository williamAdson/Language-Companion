// import algo auxiliary modules
const _ = require('lodash');

// data set
const outputs = [
    {
        name: 'oranges',
        language: 'english',
        subjects: [1, 0, 0, 0],
        total: 1        
    },
    {
        name: 'grapes',
        language: 'english',
        subjects: [0, 1, 0, 0],
        total: 1        
    },
    {
        name: 'dave',
        language: 'chinese',
        subjects: [0, 1, 1, 0],
        total: 2        
    },
    {
        name: 'mango',
        language: 'english',
        subjects: [0, 1, 1, 1],
        total: 3        
    },
    {
        name: 'apple',
        language: 'chinese',
        subjects: [1, 1, 1, 1],
        total: 4        
    },
    {
        name: 'choto',
        language: 'chinese',
        subjects: [1, 1, 1, 1],
        total: 4        
    },
    {
        name: 'william',
        language: 'chinese',
        subjects: [0, 1, 1, 1],
        total: 3        
    }
]

// prediction point data
const predictionUser = {
    name: 'nyambe',
    language: 'english',
    subjects: [1, 1, 1, 1],
    total: 4        
};

const k = 3;
const subjectNames = ['SPEAKING', 'LISTENING', 'READING', 'WRITING'];

function distance(USER){
    /* distance is measured according to the similarities in subjects
    ** if users have all subjects in common then the distance is 0
    ** if users have no subjects in common the distance is 4
    ** USER represents neighbor dataset
    ** point represents neighbor similarities in subjects
    */
   console.log('****************************'+USER.name+'****************************')
   console.log('*********************************************************************')
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
    console.log('******DISTANCE*******\n'+point);
    console.log('****************************8888888888888****************************')
    console.log('*********************************************************************')
    return 
}
let match = _.chain(outputs)
                .map( row => [ distance(row), row, row['distance']] )
                .sortBy(row => row[2] )
                .slice(0, k)
                .value()

console.log(match);                
// prediction analysis
