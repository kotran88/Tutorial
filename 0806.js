var fs=require('fs');
var express=require('express');
var bodyParser=require('body-parser');

var DummyDB=(function(){
	var DummyDB={};
	var storage=[2];
	var count=1;
	
	DummyDB.get=function(id){
		console.log("db come"+id)
		if(id){
			//id=(typeof id =='string')?Number(id):id;
			for(var i in storage) if(storage[i].id==id){
				console.log(i+"i를 뽑음");
				return storage[i];
			}
		}else{
			return storage;
		}
	}
	DummyDB.insert=function(data){
		console.log("dummy insert)")
		data.id=count++;
		storage.push(data);
		return data;
	};
	DummyDB.remove=function(id){
		//id=(typeof id='string')?Number(id):id;
		for(var i in storage) if(storage[i].id==id){
			storage.splice(i,1);
			return true;
		}
		return false;
	};
	
	return DummyDB;
})();

var app=express();

app.use(bodyParser.urlencoded({
	extended:false
}));

app.get('/user', function(request,response){
	response.send(DummyDB.get());
});
app.get('user/:id',function(request,response){
	console.log("조회 : "+request.param.id)
	response.send(DummyDB.get(request.param.id));
})

app.post('/user',function(request,response){
	console.log("post")
	var name=request.body.name;
	var region=request.body.region;
	console.log(name+","+region);
	if(name&&region){
		response.send(DummyDB.insert({
			name:name,
			region:region
		}));
	}
	
})
app.put('/user/:id',function(request,response){
	
})
app.delete('/user/:id' ,function(request,response){
	
})

app.listen(52273,function(){
	
})
