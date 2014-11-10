var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var passportConfig = require('./config/passport');
var indexController = require('./controllers/index.js');
var apiController = require('./controllers/apiController.js');
var authenticationController = require('./controllers/authentication.js');

mongoose.connect('mongodb://localhost/vgtrackr');

require('./models/seeds/seeddb.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

// stuff for passport
app.use(cookieParser());
app.use(flash());
app.use(session({secret: 'secret'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/aboutVGTrackr', indexController.faq);
// Our get request for viewing the login page
app.get('/auth/login', authenticationController.login);

// Post received from submitting the login form
app.post('/auth/login', authenticationController.processLogin);

// Post received from submitting the signup form
app.post('/auth/signup', authenticationController.processSignup);

// Any requests to log out can be handled at this url
app.get('/auth/logout', authenticationController.logout);

app.use(passportConfig.ensureAuthenticated);


app.get('/', indexController.index);
app.get('/collection', indexController.collection);
app.get('/consoles/:consolename', indexController.viewConsole);
app.get('/profiles/:username', indexController.showProfile);
app.get('/wtfmachine', indexController.wtfmachine);

//api routes
app.get('/api/getGamesByConsole', apiController.getGamesByConsole);
app.post('/api/addGametoCollection', apiController.addGametoCollection);
app.post('/api/addGametoWantList', apiController.addGametoWantList);
app.get('/api/getUserInfo', apiController.getUserInfo);

// start server
var server = app.listen(9661, function() {
	console.log('Express server listening on port ' + server.address().port);
});
