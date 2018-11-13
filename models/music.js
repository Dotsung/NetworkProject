var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var musicSchema = new Schema({
    user_id : String,
    date : {type: Date, default: Date.now},
    singer: String,
    title: String
});

module.exports = mongoose.model('music', musicSchema);