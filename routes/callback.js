var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.query.code) {
    console.log("Code is: " + req.query.code);
    req.app.locals.spotifyApi.authorizationCodeGrant(req.query.code).then(
      function(data) {
        // Set the access token on the API object to use it in later calls
        req.app.locals.spotifyApi.setAccessToken(data.body['access_token']);
        req.app.locals.spotifyApi.setRefreshToken(data.body['refresh_token']);
        req.app.locals.access = true;
      },
      function(err) {
        console.log('Something went wrong!', err);
      }
    );
  }
  else {
    console.log('Couldn\'t get an authorization code.');
  }
  res.redirect('/');
});

module.exports = router;
