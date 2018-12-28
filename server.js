var express = require('express');
var path = require('path');
var app = express();				        //서버 생성
var bodyParser = require('body-parser');	
var app = express();
var http = require('http');
var mysql = require('mysql');
var fs = require("fs");
var moment = require('moment');

const morgan = require('morgan');
const flatpickr = require("flatpickr");
const PORT = 18000;
const HOST = '0.0.0.0';

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('default'));

/*
var dbConnection = mysql.createConnection({
	host:'localhost',
	post:6033,
	user:'root',
	password:'dir5187413#',
	database:'iiot'
})
*/
// Maria DB 커넥션 풀
var dbConnection = mysql.createConnection({
	host:'127.0.0.1',
	port:3307,
	user:'root',
	password:'7413',
	database:'taewoong'
})

// Maria DB 연결
dbConnection.connect(function(err) {
    if (err) {
        console.error('Maria connection error');
        console.error(err);
        throw err;
    }
});


var r_main = require('./router/main')(app, fs);
var r_sql = require('./router/sql')(app, fs, mysql, dbConnection, moment);

var server = app.listen(PORT, HOST, function(){ 
    console.log('Server is running...(http://'+HOST+':'+PORT+')');
});