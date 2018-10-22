var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gooutSchema = new Schema({
    student: {
        name : String,
        class : String,
        number : String
    },
    goout:{
        starttime : String,
        stoptime : String,
        why : String
    }
});

module.exports = mongoose.model('goout', gooutSchema);