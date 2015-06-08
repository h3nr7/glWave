/**
 * soundcloud auth  
 */
const config = require('../../config.json');
const passport = require('passport');
const SoundcloudStrategy = require('passport-soundcloud').Strategy;
const express = require('express');
const router = express.Router();

/**
 * setup route and passport strategy
 */
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SoundcloudStrategy({
    clientID: config.services.soundcloud.client_id,
    clientSecret: config.services.soundcloud.client_secret,
    callbackURL: config.services.soundcloud.callbackUrl
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, {accessToken: accessToken, refreshToken: refreshToken, profile: profile});
    });
  }
));

/**
 * initialise passport for router
 */
router.get('/',
  passport.authenticate('soundcloud'),
  function(req, res){ });

router.get('/callback', 
  passport.authenticate('soundcloud', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/page');    
  });



module.exports = router;