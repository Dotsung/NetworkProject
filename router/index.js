module.exports = function(app, fs)
{
    // 메인 페이지
    app.get('/',function(req,res){
        res.render('index', {
            title: "GSM 기숙사"
        })
    });

    // 잔류학생 관리
    app.get('/stay', function(req,res){
        res.render('stay',{
        title: "잔류"
        })
    })

    app.get('/stay/goout', function(req,res){
        res.render('goout',{
        })
    })

    app.post('/stay/goout/goout_process', function(req, res){
        var book = new Book();
        book.title = req.body.name;
        book.author = req.body.author;
        book.published_date = new Date(req.body.published_date);
    
        book.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
    
            res.json({result: 1});
    
        });
    });
}