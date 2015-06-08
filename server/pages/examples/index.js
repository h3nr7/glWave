const _ = require('underscore');
const app = require('../../server');
const express = require('express');
const router = express.Router();
const templatePath = require.resolve('./examples.jade');
const templateFn = require('jade').compileFile(templatePath);

router.get('/', function(req, res){
	res.write(templateFn());
	res.end();
})

module.exports = router;