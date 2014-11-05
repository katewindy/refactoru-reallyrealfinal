var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
	userid: String,
	gameid: String,
	commentTitle: String,
	commentBody: String,
	commentDate: String,
	isPublic: Boolean
});

module.exports = mongoose.model('Comment', commentSchema);