var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var indexController = require('./controllers/index.js');

mongoose.connect('mongodb://localhost/vgtrackr');

require('.models/seeds/seeddb.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);

var server = app.listen(9661, function() {
	console.log('Express server listening on port ' + server.address().port);
});
