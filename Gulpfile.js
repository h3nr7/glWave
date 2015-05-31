var gulp = require('gulp');
var server = require('gulp-develop-server');


gulp.task('serve', function(dev) {

	var startServer = server.listen({
		path: './server/server.js',
		env: {NODE_ENV: 'local'},
	});

})
