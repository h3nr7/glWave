const _ = require('underscore');
const app = require('../../server');
const express = require('express');
const router = express.Router();
const templatePath = require.resolve('./index.jade');
const templateFn = require('jade').compileFile(templatePath);

router.get('/', function(req, res){
	if(!_.isEmpty(req.session.passport.user)) {

		app.models.Customer.loginWithSoundcloud( req.session.passport.user.accessToken, function(err, token) {
			console.log('token', token.id)
			res.write(templateFn({
				accessToken: token.id, 
				// accessToken: req.session.passport.user.accessToken
				// refreshToken: req.session.passport.user.refreshToken, 
				// profile: JSON.stringify(req.session.passport.user.profile)
			}));
		} );

  } else {
  	res.write(templateFn());
  }
  
  res.end();
})

module.exports = router;