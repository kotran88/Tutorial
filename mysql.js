var fs=require('fs');
var ejs=require('ejs');
var mysql=require('mysql');
var express=require('express');
var bodyParser=require('body-parser');

var client=mysql.createConnection({
	user:'admin',
	password:'admin',
	database:'company',
	port:'8789'
})
client.query('use company');

var app=express();
app.use(bodyParser.urlencoded({
	extended:false
}));

app.listen(52273, function(){
	
})

app.get('/', function(request,response){
	fs.readFile('list.html','utf8',function(error,data){
		client.query('select *from products',function(error,results){
			if(error){
				console.log("에런"+error)
			}
					console.log(results+"를 뿌려준당");
					response.send(ejs.render(data,{
						data:results
					}))
				})
		
	})
});