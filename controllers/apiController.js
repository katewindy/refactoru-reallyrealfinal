var Game = require('../models/game1.js');

var apiController = {
	//gets a list of all games (TRY NOT TO USE)
	getAllGames: function(req, res){
		Game.find({}, function(err, results){
			res.send(results);
		});
	},
	getGamesByConsole: function(req, res){
		var console = req.params.consolename;

		Game.find({consolename: console}, function(err, results){
			res.send(result);
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