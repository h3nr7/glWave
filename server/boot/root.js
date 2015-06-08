
const index = require('../pages/index');
const auth = require('../pages/auth');
const examples = require('../pages/examples');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();

	router.use(session({
		secret:'glwave with rock this world',
		resave: false,
  	saveUninitialized: true 
 	}));
	router.use(passport.initialize());
	router.use(passport.session());

  router.use('/page', index);
  router.use('/page/*', index);
  router.use('/auth', auth);
  router.use('/examples', examples);

  /**
   * redirect to page
   */
  router.get('/', function(req, res) {
    res.redirect('/page');
  })

  
  server.use(router);
};
