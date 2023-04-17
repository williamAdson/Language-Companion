const _ = require('lodash');

const outputs = []
const numbers = [
    [23, 1],
    [43, 3],
    [23, 2],
    [36, 1]
]

function onNewStudent(language, numOfSubjects, location, matchLabel){
    // what happens when we run every feature
    outputs.push([language, numOfSubjects, location, matchLabel]);
    console.log(outputs);
}
function runAnalysis(){
    // code for analyzing features
}

let sorted = _.sortBy(numbers, function(row){
    return row[1];
})
let mapped = _.map(sorted, function(row){
    return row[1]
});

let result = _.chain(numbers)
                .sortBy(row => row[1] )
                .map(row => row[0] )
                .value();

console.log(result)


