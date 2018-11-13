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

router.get('/lab', function (req, res) {
    res.render('lab', {
        title: "lab실 신청"
    })
})

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

router.get('/point', function (req, res) {
    RedPoint.find({ user_id: req.user._id }, function (err, redpoint) {
        console.log('rp');
        console.log(redpoint);
        if (err) return res.status(500).send({ error: 'database failure' });
        GreenPoint.find({ user_id: req.user._id }, function (err, greenpoint) {
            console.log('gp');
            console.log(greenpoint);
            res.render('point', {
                isAdmin: (req.user._id == "5bdb10782bbf2917b127d52d"),
                rp: redpoint,
                gp: greenpoint,
                formatDate: function(date) {
                    var d = new Date(date), 
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
              
                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;
              
                    return [year, month, day].join('-');
                  } 
            });
        });
    });
});

router.get('/point/add', function (req, res) {
    if (req.user._id == "5bdb10782bbf2917b127d52d") {
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
            musicList: music
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

module.exports = router;