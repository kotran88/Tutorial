var fs=require('fs');
var http=require('http');
var url=require('url');

http.createServer(function(request,response){
	console.log("ServerRunning1");
	fs.readFile('htmlPage.html', function(error,data){
		response.writeHead(200,{'Content-Type':'text/html'})
		response.end(data);
	});
}).listen(52273, function(){
	console.log("ServerRunning");
})

http.createServer(function(request,response){
		var date=new Date();
		console.log(date);
		date.setDate(date.getDate()+7);
		console.log(date+"7일 후 날짜");
		response.writeHead(200,{'Content-Type':'text/html',
			'Set-Cookie':['breakfast=toast;Expires='+date.toUTCString(),'dinner=chicken']	
		});
		
response.end('<h1>'+request.headers.cookie+'</h1>')	
}).listen(52274, function(){
	console.log("52274");
});

http.createServer(function(request,response){
	var pathname=url.parse(request.url).pathname;
	if(pathname=='/'){
		
		fs.readFile('htmlPage.html',function(error,data){
			response.writeHead(200,{
				'Content-Type':'text/html'
			});
			response.end(data);
		})
		
	}else if(pathname=='/otherPage'){
		fs.readFile('otherPage.html', function(error,data){
			response.writeHead(200,{
				'Content-Type':'text/html'
			});
			response.end(data);
		})
	}
}).listen(52275, function(){
	
})

