module.exports = function(app, fs)
{
	var moment = require('moment');
    app.get('/main',function(req,res){
		res.render('../views/main.html');
    });
    
    app.get('/history/:HFid',function(req,res){
    	var HFid = req.params.HFid;
    	console.log(HFid);
		res.render('../views/history.html');
    });
}