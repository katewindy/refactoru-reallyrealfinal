$(window).load(function() {
    $("#loader").delay(1000).animate({
        opacity:0,
        width: 0,
        height:0
    }, 500);
    console.log('loading screen should have appeared!');
});

$(function(){
	//populate the table with games
	var userInfoString = $.get('/api/getUserInfo', {_id: user._id}, function(responseData){

		for (var i = 0; i < responseData.userCollectionGames.length; i ++) {
			var gameElement = renderGameList(responseData.userCollectionGames[i]);

		$('.collection').append(gameElement);
		}
		for (var i = 0; i < responseData.userWishListGames.length; i ++) {
			var gameElement = renderGameList(responseData.userWishListGames[i]);

		$('.wishlist').append(gameElement);
		}
		for (var i = 0; i < responseData.userTradeListGames.length; i ++) {
			var gameElement = renderGameList(responseData.userTradeListGames[i]);

		$('.tradelist').append(gameElement);
		}
		$('table.display').DataTable({
		"pageLength":10,
		"lengthChange": false
	});

		return responseData;
	});

	console.log(userInfoString);
});

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
	return el;
};