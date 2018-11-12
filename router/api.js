var express = require('express');
var path = require('path');
var router = express.Router();

var User = require('../models/user');
var Student = require('../models/student');
var GreenPoint = require('../models/greenpoint');
var RedPoint = require('../models/redpoint');
var Music = require('../models/music');

router.get('/findstu', function(req,res){
    Student.find({user_id:req.query.user_id}, function(err,stu){
        if(err){
            console.log(err);
            res.send('error');
            return;
        }
        res.send(stu);
    });
});

router.get('/', function(req,res){
    res.send('a');
});

module.exports = router;