module.exports = function(app, fs)
{
	var moment = require('moment');
    app.get('/main',function(req,res){
		res.render('../views/main.html');
    });

    app.get('/graph',function(req,res){
		res.render('../views/graph.html');
    });
}