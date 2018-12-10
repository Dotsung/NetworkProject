var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    roomNum : Number,
    user_id1 : String,
    user_id2 : String,
    user_id3 : String,
    user_id4 : String
});


module.exports = mongoose.model('goout', roomSchema);