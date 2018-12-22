var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.app.locals.access) {
    req.app.locals.spotifyApi.getMySavedTracks({
      limit : 10,
      offset: 0
    })
    .then(function(data) {
      for (item in data.body.items) {
        console.log(item);
      }
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  }
  res.render('index', { title: 'Express', body: 'Welcome to Tagify :)', authURL: req.app.locals.authorizeURL, loggedIn: req.app.locals.access });
});

module.exports = router;
