var mongoose = require('mongoose');
var gameData = require('./newdata.js');
var Game = require('../game1.js');




Game.find({}, function(err, results){
	if(results.length === 0){
		for (var i = 0; i < gameData.length; i++){
			var thisGame = new Game ({
				consolename: gameData[i][0],
				productname: gameData[i][1],
				looseprice: gameData[i][2].substr(1),
				cibprice: gameData[i][3].substr(1),
				genre: gameData[i][4],
				gameid: (100000+i)
			});
			thisGame.save();
		}
	}
});