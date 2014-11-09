var Game = require('../models/game1.js');
var User = require('../models/user.js');

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
	},
	//adds game to user's collection
	addGametoCollection: function(req, res){
		var addGameId = req.body.gameid;
		var addToUser = req.user._id;
		var gameIsCIB = req.body.isCIB;
		Game.find({gameid: addGameId}, function(err, result){
			var pushthis = {gameid: result[0]._id, isCIB: gameIsCIB};
			User.update(
				{_id: addToUser}, 
				{$push: {userCollection: pushthis}}, function(err){
					if (err) console.log("contact addMsg error: " + err);
					});
			User.update(
				{_id: addToUser}, 
				{$push: {userCollectionGames: result[0]._id}}, function(err){
					if (err) console.log("contact addMsg error: " + err);
					console.log('game added!');
					res.send('success!');
				});

			
		});	
	},
	addGametoWantList: function(req, res){
		var addGameId = req.body.gameid;
		var addToUser = req.user._id;
		console.log('addGameId: ', addGameId);
		console.log('addToUser :', addToUser);
		Game.find({gameid: addGameId}, function(err, result){
			var pushthis = {gameid: result[0]._id};
			User.update(
				{_id: addToUser}, 
				{$push: {userWishList: pushthis}}, function(err){
					if (err) console.log("contact addMsg error: " + err);
				});
			User.update(
				{_id: addToUser}, 
				{$push: {userWishListGames: result[0]._id}}, function(err){
					if (err) console.log("contact addMsg error: " + err);

					console.log('game added!');
					res.send('success!');
				});	
		});	
	},
	getUserInfo: function(req, res){
		console.log('getUserInfo called!');
		User.find({_id:req.user._id})
			.populate('userCollectionGames', {}, 'Game').exec(function(err, user){
			if (err) return handleError(err);
			console.log('user.userCollection(inside apiController): ', user.userCollection);
			res.send(user);
		});
	}
};

module.exports = apiController;