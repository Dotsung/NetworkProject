module.exports = function(app, Goout, passport)
{
    // 메인 페이지
    var user = require('../models/user');
    var GreenPoint = require('../models/greenpoint');
    var RedPoint = require('../models/redpoint');

    app.get('/', function(req,res){
        if(req.isAuthenticated()){
            res.render('index');
        }else{
            res.render('start');
        }
            
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
            console.log(goout);
            res.render('stay',{
                title: "잔류",
                gooutInfo : goout
            });
        });
    });
    
    app.get('/point',function(req,res){
        RedPoint.find({_id:req.user._id},function(err,redpoint){
            if(err) return res.status(500).send({error: 'database failure'});
            GreenPoint.find({_id:req.user._id},function(err,greenpoint){
                res.render('point',{
                    pointInfo: {
                        RedPoint: redpoint,
                        GreenPoint: greenpoint
                    }
                });
            });
        });
    });

    app.get('/point/add',function(req,res){
        if(req.user._id == "5bdb10782bbf2917b127d52d"){
            res.render('pointadd');
        }else{
            res.redirect('/point');
        }
    });

    app.get('/stay/goout', function(req,res){
        res.render('goout',{
            checkLogin : req.isAuthenticated()
        });
    });

    app.post('/stay/goout', function(req, res){
        var goout = new Goout();
        goout.user_id = req.user._id;
        goout.starttime = req.body.starttime;
        goout.stoptime = req.body.stoptime;
        goout.why = req.body.why;

        goout.save(function(err){
            if(err){
                console.error(err);
                return;
            }
            console.log("저장");
            res.redirect('/stay');
        });

    });
}