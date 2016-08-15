var rint=require('./noname');

rint.timer.on('tick', function(code){
	console.log('event');
})