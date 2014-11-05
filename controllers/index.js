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
		res.render('byconsole.jade');
	}
};

module.exports = indexController;