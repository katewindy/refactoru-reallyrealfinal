var 

$(function(){
	$.get('/api/getGamesByConsole', {}, function(responseData){
		console.log('getGamesByConsole response:', responseData);

	});
});