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
	el.append('<td class="actions"><a href="#"" class="deleteFromCollection" data-id="' + gameData.gameid + '"><i class="fa fa-minus-circle"></i></a>&nbsp;&nbsp;<a href="#" class="toTrade"data-id="' + gameData.gameid + '"><i class="fa fa-refresh"></i></a></td>');
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
		// create lots of konami code easter eggs into pretty much all the pages
	var easter_egg = new Konami(function() {
		//shows easter egg on input on  up up down down a b
		$('#easteregg').modal('show');
	});

	
	//populate the table with games
	var userInfoString = $.get('/api/getUserInfo', {_id: user._id}, function(responseData){
		console.log('getUserInfo response:', Object.keys(responseData));
		var stringy = JSON.stringify(responseData);
		console.log('stringy: ', stringy);
		console.log(responseData);

		for (var i = 0; i < responseData.userCollectionGames.length; i ++) {
		var gameElement = renderGameList(responseData.userCollectionGames[i]);
		$('.tablebody').append(gameElement);
		}
		$('#datatable').DataTable({
		"pageLength":20,
		"lengthChange": false
		});
		return responseData;
		
	});
	// userInfoString = userInfoString.responseText;
	
	console.log('User Info after call: ', userInfoString);

	for (var i = 0; i < userInfoString.userCollectionGames.length; i ++) {
		var gameElement = renderGameList(collection[i]);
		$('.tablebody').append(gameElement);
	}
	$('#datatable').DataTable({
		"pageLength":20,
		"lengthChange": false
	});

	// //add a game to your collection
	// $(document).on('click', '.toCollection', function(e){
	// 	e.preventDefault();
	// 	var addGameID = $(this).attr("data-id");
	// 	var thisthis = $(this);
	// 	console.log(addGameID);
	// 	$.post('/api/addGameToCollection', {gameid: addGameID, isCIB: false}, function (responseData){
	// 		console.log(responseData);
	// 		thisthis.children().removeClass('fa-plus-circle');
	// 		thisthis.children().addClass('fa-minus-circle');

	// 	});
	// });

	// 	//add a game to your wishlist
	// $(document).on('click', '.toWants', function(e){
	// 	e.preventDefault();
	// 	var addGameID = $(this).attr("data-id");
	// 	var thisthis = $(this);
	// 	console.log(addGameID);
	// 	$.post('/api/addGameToWantList', {gameid: addGameID, isCIB: false}, function (responseData){
	// 		console.log(responseData);
	// 		thisthis.children().removeClass('fa-magic');
	// 		thisthis.children().addClass('fa-star').css('color' , 'yellow');

	// 	});
	// });
});