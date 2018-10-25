module.exports = function(app, Goout, passport)
{
    // 메인 페이지
    var user = require('../models/user');

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        } else {
            res.redirect('/login');
        }
    }

    app.get('/', function(req,res){
        user.find(function(err, user){
            if(err) return res.status(500).send({error: 'database failure'});
            res.render('index', {
                title: "GSM 기숙사",
                checkLogin : req.isAuthenticated()
            });
        });
    });

    app.get('/signup',function(req,res){
        res.render('signup', {
        })
    });

    app.get('/login',function(req,res){
        res.render('login', {
        })
    });

    app.get('/logout',function(req,res){
        req.logout();
        res.redirect('/');
    });
    

    app.post('/signup', passport.authenticate('signup', {
        successRedirect : '/', 
        failureRedirect : '/signup', //가입 실패시 redirect할 url주소
        failureFlash : true 
    }));

    app.post('/login', passport.authenticate('login', {
        successRedirect : '/', 
        failureRedirect : '/login', //로그인 실패시 redirect할 url주소
        failureFlash : true 
    }))

    app.get('/lab',function(req,res){
        res.render('lab', {
            title : "lab실 신청"
        })
    })

    // 잔류학생 관리
    app.get('/stay', function(req,res){
        Goout.find(function(err, goout){
            if(err) return res.status(500).send({error: 'database failure'});
            //res.json(goout);
            //var data = JSON.parse(goout);
            res.render('stay',{
                title: "잔류",
                Goout: goout
            });
        });
    });
    
    app.get('/point',function(req,res){
        
    })

    app.get('/stay/goout', function(req,res){
        res.render('goout',{
        });
    });

    

    app.post('/stay/goout', function(req, res){
        var goout = new Goout();
        goout.student.name = req.body.name;
        goout.student.class = req.body.class;
        goout.student.number = req.body.number;
        
        goout.goout.starttime = req.body.starttime;
        goout.goout.stoptime = req.body.stoptime;
        goout.goout.why = req.body.why;

        goout.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
    
            res.json({result: 1});
    
        });

    });
}