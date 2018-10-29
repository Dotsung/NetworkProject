var mongoose = require('mongoose');

var gooutSchema = mongoose.Schema({
    userid : String,
    grade : String,
    class : String,
    name : String
});

module.exports = mongoose.model('goout', gooutSchema);