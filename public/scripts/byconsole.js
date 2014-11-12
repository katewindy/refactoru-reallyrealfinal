var renderGameList = function(gameData){
	var thisGame = gameData;
	console.log(thisGame);
	if (gameData.looseprice === null){
		gameData.looseprice = 0.00;
	}
	if (gameData.cibprice === null){
		gameData.cibprice = 0.00;
	}
	var el = $('<tr>');
	el.attr('data-id', gameData.gameid);
	el.append('<td>'+ gameData.productname + '</td>');
	el.append('<td>'+ gameData.consolename + '</td>');
	el.append('<td>'+ gameData.genre + '</td>');
	el.append('<td>$' + Number(gameData.looseprice).toFixed(2) + '</td>');
	el.append('<td>$' + Number(gameData.cibprice).toFixed(2) + '</td>');
	el.append('<td class="actions"><a href="#"" class="toCollection" data-id="' + gameData.gameid + '"><i class="fa fa-plus-circle"></i></a>&nbsp;&nbsp;<a href="#" class="toWants"data-id="' + gameData.gameid + '"><i class="fa fa-magic"></i></a></td>');
	return el;
};

$(window).load(function() {
    $("#loader").delay(1000).animate({
        opacity:0,
        width: 0,
        height:0
    }, 500);
    console.log('loading screen should have appeared!');
});

$(function(){
	var consoletype = $('.console').text();	
	console.log(consoletype);
		// create lots of konami code easter eggs into pretty much all the pages
	var easter_egg = new Konami(function() {
		//shows easter egg on input on  up up down down a b
		$('#easteregg').modal('show');
	});

	
	//populate the table with games
	$.get('/api/getGamesByConsole', {consolename: consoletype}, function(responseData){
		console.log('getGamesByConsole response:', responseData);
		for (var i = 0; i < responseData.length; i ++) {
			var gameElement = renderGameList(responseData[i]);
			$('.tablebody').append(gameElement);
		}
		$('#datatable').DataTable({
			"pageLength":20,
			"lengthChange": false
		});
	});

	//add a game to your collection
	$(document).on('click', '.toCollection', function(e){
		e.preventDefault();
		var addGameID = $(this).attr("data-id");
		var thisthis = $(this);
		console.log(addGameID);
		$.post('/api/addGameToCollection', {gameid: addGameID, isCIB: false}, function (responseData){
			console.log(responseData);
			thisthis.children().css("color", "red");

		});
	});

	//add a game to your wishlist
	$(document).on('click', '.toWants', function(e){
		e.preventDefault();
		var addGameID = $(this).attr("data-id");
		var thisthis = $(this);
		console.log(addGameID);
		$.post('/api/addGameToWantList', {gameid: addGameID, isCIB: false}, function (responseData){
			console.log(responseData);
			thisthis.children().css("color", "red");

		});
	});
});