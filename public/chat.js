//connection
var socket = io.connect("https://chattingappkh.herokuapp.com");

var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

//emit events
btn.addEventListener('click', function(){
  if (handle.value !== "" && message.value !== ""){
    socket.emit('chat', {
      message: message.value,
      handle: handle.value
    });
  }
});

message.addEventListener('keypress', function(){
  socket.emit('typing', handle.value);
});

//listen for events
socket.on('chat', function(data){
  feedback.innerHTML = "";
  message.value = "";
  output.innerHTML += "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on('typing', function(data){
  feedback.innerHTML = "<p><em>" + data + " is typing...</em></p>";
});
