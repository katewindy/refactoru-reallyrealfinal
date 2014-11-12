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
app.get('/signup', indexController.signup);
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
app.get('/tradelist', indexController.tradelist);
app.get('/wishlist', indexController.wishlist);
app.get('/consoles/:consolename', indexController.viewConsole);
app.get('/profiles/:username', indexController.showProfile);
app.get('/wtfmachine', indexController.wtfmachine);
app.get('/browseusers', indexController.browseusers);


//api routes
app.get('/api/getGamesByConsole', apiController.getGamesByConsole);
app.post('/api/addGametoCollection', apiController.addGametoCollection);
app.post('/api/addGametoWantList', apiController.addGametoWantList);
app.post('/api/addGametoTradeList', apiController.addGametoTradeList);
app.get('/api/getUserInfo', apiController.getUserInfo);
app.get('/api/getUserInfoByUserName', apiController.getUserInfoByUserName);
app.post('/api/removeGameFromCollection', apiController.removeGameFromCollection);
app.post('/api/removeGameFromWantList', apiController.removeGameFromWantList);
app.post('/api/removeGameFromTradeList', apiController.removeGameFromTradeList);
app.get('/api/getAllUsers', apiController.getAllUsers);
// start server
var port = process.env.PORT || 9661;
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});
