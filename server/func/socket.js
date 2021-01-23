var express = require("express");
var fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql2 = require('mysql2/promise');
var http = require('http');
var server = http.createServer();

server.on('request', function(req, res) {
  var stream = fs.createReadStream('test.html');
  res.writeHead(200, {'Content-Type': 'text/html'});
  stream.pipe(res);
});

var io = require('socket.io').listen(server);
server.listen(8000);