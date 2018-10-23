module.exports = function(app, Goout)
{
    // 메인 페이지
    app.get('/',function(req,res){
        res.render('index', {
            title: "GSM 기숙사"
        })
    });

    // 잔류학생 관리
    app.get('/stay', function(req,res){
        Goout.find(function(err, goout){
            if(err) return res.status(500).send({error: 'database failure'});
            //res.json(goout);
            //var data = JSON.parse(goout);
            res.render('stay',{
                title: "잔류",
                Goout: goout,
            });
        });
    });

    app.get('/stay/goout', function(req,res){
        res.render('goout',{
        })
    })

    

    app.post('/stay/goout/goout_process', function(req, res){
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