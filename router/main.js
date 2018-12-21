module.exports = function(app, fs)
{
	var moment = require('moment');
    app.get('/main',function(req,res){
		res.render('../views/main.html');
    });
    
    app.get('/history',function(req,res){
		res.render('../views/history.html');
    });

    app.get('/history/:HFid',function(req,res){
		res.render('../views/history.html');
    });
}