var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var outingSchema = new Schema({
    user_id : String,
    starttime : String,
    stoptime : String,
    date : {type: Date, default: Date.now},
    why : String
});

module.exports = mongoose.model('outing', outingSchema);