const _ = require('underscore');
const app = require('../../server');
const express = require('express');
const router = express.Router();
const templatePath = require.resolve('./index.jade');
const templateFn = require('jade').compileFile(templatePath);

router.get('/', function(req, res){
	if(!_.isEmpty(req.session.passport.user)) {

		app.models.Customer.login( req.session.passport.user.accessToken, function(token) {
			console.log('yeah');
		} );
		res.write(templateFn({
			accessToken: req.session.passport.user.accessToken, 
			// refreshToken: req.session.passport.user.refreshToken, 
			profile: JSON.stringify(req.session.passport.user.profile)
		}));
  	res.end();
  } else {
  	// res.redirect('/auth');
  	res.write(templateFn({
			// accessToken: req.session.passport.user.accessToken, 
			// refreshToken: req.session.passport.user.refreshToken, 
			// profile: JSON.stringify(req.session.passport.user.profile)
		}));
  	res.end();
  }
})

module.exports = router;