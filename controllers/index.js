var indexController = {
	index: function(req, res) {
		res.render('index', {
			user: req.user
		});
	},
	collection: function(req, res) {
		res.render('collection');
	},
	viewConsole: function(req, res) {
		var consolename = req.params.consolename.split('_').join(' ').split('%2F').join('/');
		console.log(consolename);
		res.render('byconsole', {
			consolename: consolename
		});
	}
};

module.exports = indexController;