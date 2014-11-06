var Game = require('../models/game1.js');

var apiController = {
	//gets a list of all games (TRY NOT TO USE)
	getAllGames: function(req, res){
		Game.find({}, function(err, results){
			res.send(results);
		});
	},
	getGamesByConsole: function(req, res){
		var consoletype = req.query.consolename;
		console.log('in getGamesByConsole: ', consoletype);
		Game.find({consolename: consoletype}, function(err, results){
			res.send(results);
		});
	},
	// gets a single game from the DB
	getGame: function(req, res){
		var id = req.params.id;
		Game.findOne({gameid: id}, function(err, result){
			res.send(result);
		});
	}
};

module.exports = apiController;