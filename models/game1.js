var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
	productname: String,
	consolename: String,
	looseprice: Number,
	cibprice: Number,
	genre: String,
	gameid: Number,
	releaseyear: String,
	inCollection: Number,
	inTradeList: Number,
	comments: [Number]
});

module.exports = mongoose.model('Game', gameSchema);