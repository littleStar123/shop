var mysql=require("mysql");
var express = require('express');
var app = express();
var fs = require("fs");
var sql = require('./sql.js')

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.all('*', function(req, res, next) {  
	console.log("server received")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "*");
    next();
});

/*
	登录
	传入：用户名，密码
	返回：是否成功
 */
app.post('/login', urlencodedParser, function (req, res) { 
	console.log("login")
   console.log(req.body)
    var senddata={code: 200, msg: 'done'};
    res.send(senddata);
   	res.end(JSON.stringify(senddata));
})

app.get('/login', function (req, res) { 
	console.log("login")
   	console.log(JSON.stringify(req.query))
   	var senddata={code: 200, msg: 'done'};
   	res.send(senddata);
   	// res.end(JSON.stringify(senddata));
})


var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port
	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
