var express = require('express');
var path = require('path');
var router = express.Router();
var axios = require('axios');

var passport = require('passport');
var Goout = require('../models/goout');
var User = require('../models/user');
var Student = require('../models/student');
var GreenPoint = require('../models/greenpoint');
var RedPoint = require('../models/redpoint');
var Music = require('../models/music');
var Room = require('../models/room');

var formatDate = function(date) {
    var d = new Date(date), 
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
} 

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        res.render('index');
    } else {
        res.redirect('/login');
    }
}); 

router.get('/login', function (req, res) {
    var fmsg = req.flash();
    if (fmsg.error) {
        var errMsg = fmsg.error[fmsg.error.length - 1];
        console.log(errMsg);
    }
    res.render('login', {
        errmsg: errMsg
    });
});

router.get('/signup', function (req, res) {
    var fmsg = req.flash();
    if (fmsg.error) {
        var errMsg = fmsg.error[fmsg.error.length - 1];
        console.log(errMsg);
    }
    res.render('signup', {
        errmsg: errMsg
    })
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup', //가입 실패시 redirect할 url주소
    failureFlash: true
}));

router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login', //로그인 실패시 redirect할 url주소
    failureFlash: true
}))

router.get('/point', function (req, res) {
    RedPoint.find({ user_id: req.user._id }, function (err, redpoint) {
        console.log('rp');
        console.log(redpoint);
        if (err) return res.status(500).send({ error: 'database failure' });
        GreenPoint.find({ user_id: req.user._id }, function (err, greenpoint) {
            console.log('gp');
            console.log(greenpoint);
            res.render('point', {
                isAdmin: (req.user._id == "5c0df1a54222acb5d353df06"),
                rp: redpoint,
                gp: greenpoint,
                formatDate: formatDate
            });
        });
    });
});

router.get('/point/add', function (req, res) {
    if (req.user._id == "5c0df1a54222acb5d353df06") {
        res.render('pointadd');
    } else {
        res.redirect('/point');
    }
});

router.post('/point/greenpoint', function (req, res) {
    Student.find({
        grade: req.body.grade,
        class: req.body.class,
        number: req.body.number,
        name: req.body.name
    }, function (err, stu) {
        if (err) return res.status(500).send({ error: 'database failure' });

        // console.log(stu);
        // console.log('-----');
        // console.log(stu[0].user_id);
 
        var gp = new GreenPoint();
        gp.user_id = stu[0].user_id;
        gp.point = req.body.point;
        gp.why = req.body.why;

        gp.save(function (err) {
            if (err) {
                console.error(err);
                return;
            }
            console.log("저장");
            res.redirect('/point');
        });
    });
});

router.post('/point/redpoint', function (req, res) {
    Student.find({
        grade: req.body.grade,
        class: req.body.class,
        number: req.body.number,
        name: req.body.name
    }, function (err, stu) {
        if (err) return res.status(500).send({ error: 'database failure' });
        var rp = new RedPoint();
        rp.user_id = stu[0].user_id;
        rp.point = req.body.point;
        rp.why = req.body.why;

        rp.save(function (err) {
            if (err) {
                console.error(err);
                return;
            }
            console.log("저장");
            res.redirect('/point');
        });
    });
});

router.get('/music', function (req, res) {
    Music.find(function (err, music) {
        res.render('music', {
            musicList: music,
            formatDate: formatDate
        });
    });
});

router.post('/music/add', function (req, res) {
    var music = new Music();
    music.user_id = req.user_id;
    music.singer = req.body.singer;
    music.title = req.body.title;

    music.save(function (err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("저장");
        res.redirect('/music');
    });
});

// 잔류학생 관리
router.get('/stay', function (req, res) {
    Goout.find(function (err, goout) {
        if (err) return res.status(500).send({ error: 'database failure' });
        //res.json(goout);
        //var data = JSON.parse(goout);
        // console.log(goout);
        res.render('stay', {
            gooutInfos: goout,
            Student: Student
        });
    });
});

router.get('/stay/goout', function (req, res) {
    res.render('goout', {
        checkLogin: req.isAuthenticated()
    });
});

router.post('/stay/goout', function (req, res) {
    var goout = new Goout();
    goout.user_id = req.user._id;
    goout.starttime = req.body.starttime;
    goout.stoptime = req.body.stoptime;
    goout.why = req.body.why;

    goout.save(function (err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("저장");
        res.redirect('/stay');
    });

});

router.get('/lab', function (req, res){
     
});

router.get('/room', function (req,res){

});

router.get('/room/add', function(req,res){
    if (req.user._id == "5c0df1a54222acb5d353df06") {
        res.render('roomadd');
    } else {
        res.redirect('/room');
    }
});

router.post('/room/roomadd', function(req,res){
    var roomData = new Room();

    roomData.roomNum = req.body.roomNum;
    Student.find({
        grade: req.body.grade1,
        class: req.body.class1,
        number: req.body.num1,
        name: req.body.stu1
    }, function(err, stu1){
        if (err) return res.status(500).send({ error: 'database failure' });
        roomData.user_id1 = stu1[0].user_id;
        Student.find({
            grade: req.body.grade2,
            class: req.body.class2,
            number: req.body.num2,
            name: req.body.stu2
        }, function(err, stu2){
            if (err) return res.status(500).send({ error: 'database failure' });
            roomData.user_id2 = stu2[0].user_id;
            Student.find({
                grade: req.body.grade3,
                class: req.body.class3,
                number: req.body.num3,
                name: req.body.stu3
            }, function(err, stu3){
                if (err) return res.status(500).send({ error: 'database failure' });
                roomData.user_id3 = stu3[0].user_id;
                if(req.body.grade4 == ""){
                    console.log('진입');
                    roomData.user_id4 = null
                }
                else{
                    Student.find({
                        grade: req.body.grade4,
                        class: req.body.class4,
                        number: req.body.num4,
                        name: req.body.stu4
                    }, function(err, stu4){
                        if (err) {
                            return res.status(500).send({ error : 'database failure'});
                        }
                        roomData.user_id4 = stu4[0].user_id;
                    });
                }

                roomData.save(function (err){
                    if(err) {
                        console.log(err);
                        return;
                    }
                    console.log("호실명 : " + roomData.roomNum);
                    console.log("구성원1 : " + roomData.user_id1);
                    console.log("구성원2 : " + roomData.user_id2);
                    console.log("구성원3 : " + roomData.user_id3);
                    console.log("구성원4 : " + roomData.user_id4);
                    console.log("호실 저장 완료");
                    res.redirect('/room/add');
                })                
            });            
        });        
    });
    
    
    
});
module.exports = router;