var indexController = {
	index: function(req, res) {
		res.render('index', {
			user: req.user
		});
	},
	collection: function(req, res) {
		res.render('collection', {
			user: req.user
		});
	},
	viewConsole: function(req, res) {
		var consolename = req.params.consolename.split('_').join(' ').split('%2F').join('/');
		console.log(consolename);
		res.render('byconsole', {
			user: req.user,
			consolename: consolename
		});
	},
	showProfile: function(req, res){
		res.render('profile', {
			user: req.user
		});
	},
	faq: function(req, res){
		res.render('faq');
	},
	wtfmachine: function(req, res){
		res.render('wtfmachine', {
			user: req.user
		});
	},
	tradelist: function(req, res){
		res.render('tradelist', {
			user: req.user
		});
	},
	wishlist: function(req, res){
		res.render('wishlist', {
			user: req.user
		});
	}
};

module.exports = indexController;