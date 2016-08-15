/*console.time('alphs');
var output=1;
for(var i=1; i<10; i++){
	
	output *=i;
}
console.log('Result:', output);

console.timeEnd('alphs');*/

/*process.argv.forEach(function(item, index){
	console.log(index+':'+typeof(item)+':'+item);
	
	console.log('exitTime:'+Number(process.argv[index+1]));
	
})*/

exports.abs=function(number){
	if(0<number){
		return number;
	}else{
		return -number;
	}
};

exports.circleArea=function(radius){
	return radius*radius*Math.PI;
	
}