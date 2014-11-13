// DON'T TOUCH THIS EITHER (except for where noted)

var passport = require('passport');

var User = require('../models/user');

var performLogin = function(req, res, next, user){
	req.login(user, function(err){
		if (err) return next(err);
		return res.redirect('/');
	});
};

var authenticationController = {
	login: function(req, res){
		res.render('login', {
			error: req.flash('error')
		});
	},
	processLogin: function(req, res, next){
		var authFunction = passport.authenticate('local', function(err, user, info){
			if (err) return next(err);
			if (!user){
				req.flash('error', 'Sorry, there\'s been a problem logging you in.  Please give it another shot.');
				return res.redirect('/auth/login');
			}
			performLogin(req, res, next, user);
		});
		authFunction(req, res, next);
	},
	processSignup: function(req, res, next){
		var user = new User({
			// only mess with this if you're adding fields to the sign up page!!!
			username: req.param('username'),
			password: req.param('password'),
			email: req.param('email'),
			hometown: req.param('hometown'),
			firstname: req.param('firstname'),
			lastname: req.param('lastname'),
			favGame: req.param('favGame'),
			favGenre: req.param('favGenre'),
			steamid: req.param('steamid'),
			psnid: req.param('psnid'),
			xboxliveid: req.param('xboxliveid')
		});
		console.log(user, req.param('password'));
		user.save(function(err, user){
			if(err){
				var errorMessage = 'There was an error signing you up.  Please don\'t hate us and give it another shot.';
				if (err.code === 11000){
					errorMessage = 'Sorry, this username or email already exists.  Try again, or, if you\'re sure this is you, maybe try logging in?';
				}
				req.flash('error', errorMessage);
				return res.redirect('/signup');
			}
			performLogin(req, res, next, user);
		});
	},
	logout: function(req, res){
		req.logout();
		res.redirect('/auth/login');
	}
};

module.exports = authenticationController;