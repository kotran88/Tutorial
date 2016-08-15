var fs=require('fs');

var text=fs.readFile('text222.txt', 'utf8', function(error, data){
	
	if(error){
		console.log(error);
	}else{
		console.log(data);
		
	}
});



var data="hello node.js";
fs.writeFile('text.txt',data,'utf8',function(error){
	
	if(error){
		console.log(error);
	}else{
		
		console.log('Write file complete');
	}
});
/*
console.log('completed1');
fs.writeFileSync('TextFileotherWriteSync.txt',data,'utf8');
console.log('completed');*/