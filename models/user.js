var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Game = require('../models/game1.js');

// note that all of these aren't being used yet, I just have a lot of ideas to add!
var userSchema = mongoose.Schema({
	username:{
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: String,
	lastName: String,
	userPicUrl: String,
	hometown: String,
	headline: String,
	userlink: String,
	favGame: String,
	favGenre: String,
	steamid: String,
	psnid: String,
	xboxliveid: String,
	nintendoid: String,
	kongregateid: String,
	// currently where user game collection is
	userCollectionGames: [{type: mongoose.Schema.ObjectId, ref: 'Game'}],
	userTradeListGames: [{type: mongoose.Schema.ObjectId, ref: 'Game'}],
	userCollection: [{
			gameid: {type: mongoose.Schema.ObjectId, ref:'Game'},
			isCIB: Boolean,
			conditionNotes: String,
			photoUrl: String,
			inTradeList: Boolean,
			rating: Number,
			favorite: Boolean
		}],
	collectionIsPublic: Boolean,
	isTradeListPublic: Boolean,
	gamesInCollection: Number,
	gamesInTradeList: Number,
	gamesInWantList: Number,
	userWishListGames: [{type: mongoose.Schema.ObjectId, ref: 'Game'}],
	userWishList: [{
			gameid: {type: mongoose.Schema.ObjectId, ref:'Game'},
			dateAdded: String,
			important: Boolean
		}],
	isWishListPublic: Boolean
});

// hash password on user save if the password is new or has been modified
userSchema.pre('save', function(next){
	console.log('testing!');
	if(!this.isModified('password')) return next();
	console.log(this.password);
	var user = this;
	bcrypt.genSalt(10, function(err, salt){
		if (err) return next(err);
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if (err) return next(err);
			user.password = hash;
			return next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, next) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if (err) return next(err);
		return next(null, isMatch);
	});
};

var User = mongoose.model('user', userSchema);

module.exports = User;