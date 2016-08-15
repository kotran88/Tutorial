var fs=require('fs');
var express=require('express');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');

var app=express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended:false
}));

app.get('/', function(request,response){
	if(request.cookies.auth){
		response.send('<h1>abc</h1>')
	}else{
		response.redirect('/login');
	}
});
app.get('/login', function(request,response){
	fs.readFile('HTMLPage2.html', function(error,data){
		response.send(data.toString());
	})
});
app.post('/login', function(request,response){
	var login =request.body.login;
	var password=request.body.password;
	if(login=='rint'&&password=='1234'){
		response.cookie('auth',true);
		response.redirect('/');
	}else{
		response.redirect('/login');
	}
});

app.listen(52273,function(){
	
})