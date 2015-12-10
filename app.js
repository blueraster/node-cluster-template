var express = require('express');
var cluster = require('cluster');
var app = express();


var cluster = require('cluster');
 
if (cluster.isMaster) {
  var numCPUs = require('os').cpus().length;
 
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
	cluster.on('exit', function (worker) {
		console.log('Worker ' + worker.id + ' exited');
		cluster.fork();
	});
} else {
	app = express();
	app.get('/getJason', function (req, res) {
		runWorker('Jason',10000,function(){
			res.send('Hello World!');
		});
	});

	app.get('/getJon', function (req, res) {
		runWorker('Jon',10000,function(){
			res.send('Hello World!');
		});
	});
	app.get('/', function (req, res) {
	  runWorker('Home',10000,function(){
			res.send('Hello World!');
		});
	});


	function runWorker(name,time,callback){
		setTimeout(function(){ 
			callback()
		}, time);
	}


	var server = app.listen(3000, function () {
		var host = server.address().address;
		var port = server.address().port;
		console.log('Example app listening at http://%s:%s', host, port);	
	});
}