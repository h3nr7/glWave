
const index = require('../pages/index');
const auth = require('../pages/auth');
const session = require('express-session');
const passport = require('passport');

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

  router.use('/', index);
  router.use('/auth', auth);
  
  server.use(router);
};
