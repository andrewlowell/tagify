require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var callbackRouter = require('./routes/callback');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: process.env.

// Spotify setup :) :) :) :) :) :) :) :) :(
var SpotifyWebApi = require('spotify-web-api-node');
app.locals.spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFYCLIENTID,
  clientSecret: process.env.SPOTIFYCLIENTSECRET,
  redirectUri: 'http://localhost:3000/callback'
});
let scopes = ['playlist-read-private', 'playlist-modify-private', 'user-library-read', 'user-library-modify'];
app.locals.authorizeURL = app.locals.spotifyApi.createAuthorizeURL(scopes);
app.locals.access = false;

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/callback', callbackRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler :)
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
