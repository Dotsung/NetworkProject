var mongoose = require('mongoose');

var gooutSchema = mongoose.Schema({
    user_id : String,
    grade : String,
    class : String,
    number : String,
    name : String
});

module.exports = mongoose.model('goout', gooutSchema);