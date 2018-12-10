var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var labSchema = new Schema({
    labName : String,
    seatNum : Number,
    reservation : Boolean,
    user_id : String
});


module.exports = mongoose.model('goout', labSchema);