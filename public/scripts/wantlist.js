$(window).load(function() {
    $("#loader").delay(1000).animate({
        opacity:0,
        width: 0,
        height:0
    }, 500);
    console.log('loading screen should have appeared!');
});

$(function(){
		// create lots of konami code easter eggs into pretty much all the pages
	var easter_egg = new Konami(function() {
		//shows easter egg on input on  up up down down a b
		$('#easteregg').modal('show');
	});

	
	//populate the table with games
	var userInfoString = $.get('/api/getUserInfo', {_id: user._id}, function(responseData){

		for (var i = 0; i < responseData.userWishListGames.length; i ++) {
		var gameElement = renderGameList(responseData.userWishListGames[i]);

		$('.tablebody').append(gameElement);
		}
		var table = $('#datatable').DataTable();
		// table.clear();

		return responseData;
		
	});
	console.log(userInfoString);

	//delete a game from your trade list
	$(document).on('click', '.deleteFromWantList', function(e){
		e.preventDefault();
		var addGameID = $(this).attr("data-id");
		var thisrow = $(this).closest('tr');
		console.log(addGameID);
		$.post('/api/removeGameFromWantList', {gameid: addGameID}, function (responseData){
			console.log(responseData);
			$('#datatable').DataTable().destroy();
			thisrow.remove();
			var table = $('#datatable').DataTable();
		});
	});
});

var renderGameList = function(gameData){
	var thisGame = gameData;
	console.log(thisGame);
	if (thisGame.looseprice === null){
		thisGame.looseprice = 0.00;
	}
	if (thisGame.cibprice === null){
		thisGame.cibprice = 0.00;
	}
	var el = $('<tr>');

	el.attr('data-id', thisGame.gameid);
	el.append('<td>'+ thisGame.productname + '</td>');
	el.append('<td>'+ thisGame.consolename + '</td>');
	el.append('<td>'+ thisGame.genre + '</td>');
	el.append('<td>$' + Number(thisGame.looseprice).toFixed(2) + '</td>');
	el.append('<td>$' + Number(thisGame.cibprice).toFixed(2) + '</td>');
	el.append('<td class="actions"><a href="#"" class="deleteFromWantList" data-id="' + thisGame.gameid + '"> Remove Game </a></td>');
	return el;
};