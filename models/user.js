var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

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
	userCollection: {
		isPublic: Boolean,
		isTradeListPublic: Boolean,
		gamesInCollection: Number,
		games: [{
			gameid: String,
			isCIB: Boolean,
			price: Number,
			conditionNotes: String,
			photoUrl: String,
			inTradeList: Boolean,
			rating: Number,
			favorite: Boolean
		}]
	},
	userWishList: {
		isWishListPublic: Boolean,
		games: [{
			gameid: String,
			dateAdded: String,
			important: Boolean
		}]
	}
});

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