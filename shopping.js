var fs=require('fs');
var ejs=require('ejs');
var http=require('http');
var express=require('express');

var counter=0;
function Product(name, image,price, count){
	this.index=counter++;
	this.name=name;
	this.image=image;
	this.price=price;
	this.count=count;
}

var products=[
              new Product('javascript', 'chrome.png', 28000,30),
              new Product('jQuery', 'chrome.png', 32000,30),
              new Product('j', 'chrome.png', 32000,30)
              ];

var app=express();
var server=http.createServer(app);
app.use(express.static(__dirname+'/public'))

app.get('/', function(request, response){
  var htmlPage=fs.readFileSync('shoping.html','utf8');
  
  response.send(ejs.render(htmlPage,{
    products:products
  }))
})

server.listen(52273,function(){
  console.log(("성공"))
})

var io=require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
	console.log("connected")
	function onReturn(index){
		console.log("10초지남")
		products[index].count++;
		clearTimeout(cart[index].timerID);
		delete cart[index];
		io.sockets.emit('count',{
			index:index,
			count:products[index].count
		})
	}
	
	function setTimeLeft(index){
		var time=10;
		console.log("초기화된시간은 : "+time)
		setInterval(function(){
			time=time-1;
			if(time<0){
				return;
			}
			console.log("남은시간은 : "+time)
			io.sockets.emit('timeout',{
				index:index,
				time: time
			})
		}, 1000)
	}
	var cart={
			
	};
	socket.on('cart', function(index){
		console.log("카트옴")
		var time=10;
		products[index].count--;
		cart[index]={};
		cart[index].index=index;
		setTimeLeft(index);
		//10초 후 onReturn과 setTimeLeft함수를 실행
		cart[index].timerID=setTimeout(function(){
			console.log("시간잰다. ")
			onReturn(index);
			
		},10*1000)
		io.sockets.emit('count',{
			index:index,
			count:products[index].count
		})
	})
	socket.on('buy',function(index){
		clearTimeout(cart[index].timerID);
		delete cart[index];
		io.sockets.emit('count',{
			index : index,
			count : products[index].count
		})
	})
	socket.on('return',function(index){
		onReturn(index);
	})
})


