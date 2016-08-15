var http=require('http');
var fs=require('fs');
var socketio=require('socket.io');

var server=http.createServer(function(request,response){
	fs.readFile('HTMLPage.html',function(error,data){
		response.writeHead(200,{
			'Content-Type':'text/html'
		});
		response.end(data);
	});
}).listen(52273,function(){
	console.log("server running");
})
var id=0;
var io=socketio.listen(server);
io.sockets.on('connection',function(socket){
	
	var roomName=null;
	
	//클라이언트로부터 join 이벤트가 연결된다. 
	socket.on('join', function(data){
		roomName=data;
		console.log("들어가는 방 이름은 : "+roomName);
		//클라이언트를 data(방이름)에 넣는다. 
		socket.join(data);
	})
	
	
	//클라이언트가 보낸 메세지 이벤트가 연결된다!!! 내용은 매개변수 data에 들어있다. 
	socket.on('message',function(data){
		
		console.log("받은 메세지는 : "+data.message);
		//같은 방에 있는 클라이언트를 추출(io.sockets.in(roomName) 하여 그 클라이언트에게만 메세지를 보낸다. 
		io.sockets.in(roomName).emit('message',data);
	})
	
	//아이디 부여. 마지막로그인한 사람에게(id) emit함. 
	/*id=socket.id;
	console.log("접속한 id:"+id);
	socket.on('rint',function(data){
		console.log("client send data",data);
		//io.sockets.emit('smart',data);
		io.sockets.to(id).emit('smart',data);
	})*/
	
});