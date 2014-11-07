


var indexController = {
	index: function(req, res) {
		// User.findOne({_id: req.user.id})
		// .populate('userCollection', null, 'game')
		// .exec(function(err, doc){
		// 	console.log(err);
  //       	console.log(doc);
		// });
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
	}
};

module.exports = indexController;