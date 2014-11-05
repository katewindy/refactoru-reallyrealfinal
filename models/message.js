var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
	authorid: String,
	recipientid: String,
	messagebody: String,
	messagedate: String,
	unread: Boolean,
	replied: Boolean,
	archived: Boolean,
	deleted: Boolean
});

module.exports = mongoose.model('Message', messageSchema);