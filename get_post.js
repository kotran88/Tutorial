var http=require('http');
var url=require('url');
var fs=require('fs');

http.createServer(function(request,response){
	if(request.method=='GET'){
		fs.readFile('HTMLPage2.html',function(error,data){
			response.writeHead(200,{
				'Content-Type':'text/html'
			})
			response.end(data);
		});
	}else{
		request.on('data',function(data){
			response.writeHead(200,{
				'Content-type':'text/html'
			});
			response.end('<h1>'+data+'</h1>')
		})
	}
}).listen(52276,function(){
	
})