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

	
	//populate the table with users
	$.get('/api/getAllUsers', {}, function(responseData){
		console.log(responseData);
		for (var i = 0; i < responseData.length; i ++) {
			var thisUserName = responseData[i].username;
			var gamesCollected = responseData[i].userCollectionGames.length;
			var gamesForTrade = responseData[i].userTradeListGames.length;
			var gamesWished = responseData[i].userWishListGames.length;
			var favGenre = responseData[i].favGenre;

			var userElement = renderUserList(thisUserName, gamesCollected, gamesForTrade, gamesWished, favGenre);

		$('.tablebody').append(userElement);
		}
		$('#datatable').DataTable({
		"pageLength":20,
		"lengthChange": false
		});
		// table.clear();

		return responseData;
		
	});
	
});

var renderUserList = function(thisUserName, gamesCollected, gamesForTrade, gamesWished, favGenre){
	
	var el = $('<tr>');

	el.append('<td><a href="/profiles/'+ thisUserName + '">' +thisUserName + '</a></td>');
	el.append('<td>'+ gamesCollected + '</td>');
	el.append('<td>'+ gamesForTrade + '</td>');
	el.append('<td>' + gamesWished + '</td>');
	el.append('<td>' + favGenre + '</td>');
	return el;
};

