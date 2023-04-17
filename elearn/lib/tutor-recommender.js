// import user models
const Tutor = [
    {
        name: 'Mark Damion',
        age: 23,
        subjects: [
            'listening','speaking','writing'
        ]
    },
    {
        name: 'Zia Angel',
        age: 20,
        subjects: [
            'listening','reading', 'writing'
        ]
    },
    {
        name: 'Carol Kennedy',
        age: 25,
        subjects: [
            'speaking','reading','listening'
        ]
    }
]
// recommendation system
// Get tutor student data
const Recommender = function(data, tutors=Tutor){
    let matchArr = [];
    // loop through list of tutors
    for(let i = 0; i < tutors.length; i++){
        // loop through list of tutor subjects
        for(let j=0; j<tutors[i].subjects.length; j++){
            let matchSubjects = tutors[i].subjects[j];
            // tutor & student have subjects in common
            if(matchSubjects === data.subject){
                // append tutor id
                matchArr.push(tutors[i].name);
            }else{
                continue
            }
        }
    }
    return matchArr
    
}

// export module
module.exports = Recommender

