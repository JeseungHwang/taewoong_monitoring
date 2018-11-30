var express = require('express');
var path = require('path');
var app = express();				        //서버 생성
var bodyParser = require('body-parser');	
var app = express();
var http = require('http');
//var fs = require("fs");



app.use(express.static(path.join( __dirname + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


var router = require('./router/main')(app);

var server = app.listen(7878, function(){ 
    console.log('Server is running...');
});