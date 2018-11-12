var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var greenPointSchema = new Schema({
    user_id : String,
    date : {type: Date, default: Date.now},
    point : Number,
    why : String
});

module.exports = mongoose.model('greenPoint', greenPointSchema);