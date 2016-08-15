var socketio=require('socket.io');
var express=require('express');
var http=require('http');
var fs=require('fs');
var seats=[
           
           [1,1,0,1,1,1,1,1,1,1,1,0,1,2],
           [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
           [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
           [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
           
           ];

var app=express();
var server=http.createServer(app);
app.get('/', function(request,response){
	fs.readFile('seat_chair.html', function(error,data){
		response.send(data.toString());
	})
})

app.get('/seats',function(request,response,next){
	response.send(seats);
})

server.listen(52273, function(){
	
})
var io=socketio.listen(server);
io.sockets.on('connection', function(socket){
	socket.on('reserve', function(data){
		//console.log(data.x+","+data.y)
		seats[data.y][data.x]=2;
		
		console.log(seats)
		io.sockets.emit('reserve',data);
	})
})