<<<<<<< HEAD
let express = require("express");
let app = express();
var path = require('path');
const bodyParser = require('body-parser');
const mysql2 = require('mysql2/promise');
var http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 7000;

app.get('/test', function(req,res){
  res.sendFile(path.resolve('../../view/sockettest.html'));
});

io.on('connection',function(socket){
  socket.on('message',function(msg){
      console.log('message: ' + msg);
  });
});

http.listen(PORT, function(){
  console.log('server listening. Port:' + PORT);
});
=======
let express = require("express");
let app = express();
var path = require('path');
const bodyParser = require('body-parser');
const mysql2 = require('mysql2/promise');
var http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 7000;

app.get('/test', function(req,res){
  res.sendFile(path.resolve('../../view/sockettest.html'));
});

io.on('connection',function(socket){
  socket.on('message',function(msg){
      console.log('message: ' + msg);
  });
});

http.listen(PORT, function(){
  console.log('server listening. Port:' + PORT);
});
>>>>>>> origin/v1.0.1/server
