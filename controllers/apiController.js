var Game = require('../models/game1.js');
var User = require('../models/user.js');
var ObjectId = require('mongoose').Types.ObjectId;


var apiController = {
	//gets a list of all games (TRY NOT TO USE)
	getAllGames: function(req, res){
		Game.find({}, function(err, results){
			res.send(results);
		});
	},
	// gets a list of all users for the browse page
	getAllUsers: function(req, res){
		User.find({}, function(err, results){
			res.send(results);
		});
	},
	// gets all games for a given console
	getGamesByConsole: function(req, res){
		var consoletype = req.query.consolename;
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
			// I'll be using this code later
			///////////////////////////////////////
			// User.update(
			// 	{_id: addToUser}, 
			// 	{$push: {userCollection: pushthis}}, function(err){
			// 		if (err) console.log("contact addMsg error: " + err);
			// 		});
			User.update(
				{_id: addToUser}, 
				{$push: {userCollectionGames: result[0]._id}}, function(err){
					if (err) console.log("contact addMsg error: " + err);
					// console.log('game added!');
					res.send('success!');
				});

			
		});	
	},
	// add a game to user's wants list
	addGametoWantList: function(req, res){
		var addGameId = req.body.gameid;
		var addToUser = req.user._id;
		Game.find({gameid: addGameId}, function(err, result){
			var pushthis = {gameid: result[0]._id};
			// I'll be using this code later
			///////////////////////////////////////
			// User.update(
			// 	{_id: addToUser}, 
			// 	{$push: {userWishList: pushthis}}, function(err){
			// 		if (err) console.log("contact addMsg error: " + err);
			// 	});
			User.update(
				{_id: addToUser}, 
				{$push: {userWishListGames: result[0]._id}}, function(err){
					if (err) console.log("contact addMsg error: " + err);
					res.send('success!');
				});	
		});	
	},
	// add a game to user's trade list
	addGametoTradeList: function(req, res){
		var addGameId = req.body.gameid;
		var addToUser = req.user._id;
		Game.find({gameid: addGameId}, function(err, result){
			var pushthis = {gameid: result[0]._id};
			// User.update(
			// 	{_id: addToUser}, 
			// 	{$push: {userWishList: pushthis}}, function(err){
			// 		if (err) console.log("contact addMsg error: " + err);
			// 	});
			User.update(
				{_id: addToUser}, 
				{$push: {userTradeListGames: result[0]._id}}, function(err){
					if (err) console.log("contact addMsg error: " + err);
					res.send('success!');
				});	
		});	
	},
	// gets user info by the user's id (usually used to grab the logged in user's info from the db)
	getUserInfo: function(req, res){
		User.findOne({_id:req.user._id})
			.populate('userCollectionGames', {}, 'Game').populate('userWishListGames',{}, 'Game').populate('userTradeListGames', {}, 'Game').exec(function(err, user){
			if (err) return handleError(err);
			res.send(user);
		});
	},
	// gets user info by their user name (for the profile pages)
	getUserInfoByUserName: function(req, res){
		User.findOne({username: req.query.username})
			.populate('userCollectionGames', {}, 'Game').populate('userWishListGames',{}, 'Game').populate('userTradeListGames', {}, 'Game').exec(function(err, user){
			if (err) return handleError(err);
			res.send(user);
		});
	},
	//these last three remove games from the user's collection, want list and tradelist.
	removeGameFromCollection: function(req, res){
		var gameToDelete = req.body.gameid;
		var removeFromUser = req.user._id;
		Game.find({gameid: gameToDelete}, function(err, result){
				var removethis = result[0]._id;
				User.update(
				{_id: removeFromUser}, 
				{$pull: {userCollectionGames: new ObjectId(removethis)}}, function(err){
					if (err) console.log("error: " + err);
					res.send('deleted!');
					});
						
		});
	},
	removeGameFromWantList: function(req, res){
		var gameToDelete = req.body.gameid;
		var removeFromUser = req.user._id;
		Game.find({gameid: gameToDelete}, function(err, result){
				var removethis = result[0]._id;
				User.update(
				{_id: removeFromUser}, 
				{$pull: {userWishListGames: new ObjectId(removethis)}}, function(err){
					if (err) console.log("error: " + err);
					res.send('deleted!');
					});
						
		});
	},
	removeGameFromTradeList: function(req, res){
		// console.log('removeGameFromTradeList called!');
		var gameToDelete = req.body.gameid;
		var removeFromUser = req.user._id;
		Game.find({gameid: gameToDelete}, function(err, result){
				var removethis = result[0]._id;
				// console.log('removethis: ', removethis);
				// console.log('removefromuser: ', removeFromUser);	
				User.update(
				{_id: removeFromUser}, 
				{$pull: {userTradeListGames: new ObjectId(removethis)}}, function(err){
					if (err) console.log("error: " + err);
					// console.log('deleted!');
					res.send('deleted!');
					});
						
		});
	}

};

module.exports = apiController;