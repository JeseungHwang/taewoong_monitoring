var express = require('express');
var path = require('path');
var app = express();				        //서버 생성
var bodyParser = require('body-parser');	
var app = express();
var http = require('http');
//var fs = require("fs");
const morgan = require('morgan');



app.use(express.static(path.join( __dirname + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('default'));


var router = require('./router/main')(app);

var server = app.listen(3000, '0.0.0.0', function(){ 
    console.log('Server is running...');
});