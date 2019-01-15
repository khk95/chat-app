var express = require('express');
var socket = require('socket.io');

//app setup
var app = express();

var port = process.env.PORT || 5000;

var server = app.listen(port, function(){
  console.log('listening on port 5000');
});

//static files
app.use(express.static('public'));

//socket setup
var io = socket(server);

io.on('connection', function(socket){
  console.log('made connection');

  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  });
});
