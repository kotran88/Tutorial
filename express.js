var express=require('express');

var app=express();
app.use(function(request, response){
	
	var output=[];
	for(var i=0; i<3; i++){
		output.push({
			count:i,
			name:'name-'+i
		})
	}
	//response.send(output);
	//response.status(404).send('<h1>error</h1>')
	var agent=request.header('User-Agent');
	console.log(agent);
	//console.log(request.headers);
	if(agent.toLowerCase().match(/chrome/)){
		response.send('Chrome!')
	}else(agent.toLowerCase().match(/edge/)){
		response.send("edge")
	}
	//response.sendStatus(200);
})

app.listen(52273,function(){
	console.log('s.running.');
})
