var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var server = require('gulp-develop-server');
var babelify = require('babelify');
var del = require('del');

var paths = {
	app_js: './client/app/main.js',
	styles: [
		'./client/app/styles/*.styl'
	],
	assets: './client/assets',
	client: './client'
};

gulp.task('assets', copy_assets);
function copy_assets() {
	return gulp.src(paths.assets + '/**')
		.pipe(gulp.dest('client/build/assets'));
}

gulp.task('build:browserify', build_browserify);
function build_browserify() {
	// clean up
	// del(['client/build/**']);

	return browserify({
		entries: [paths.app_js],
		transform: [babelify],
		extensions: ['.js', '.jsx'],
		debug: true, // turn off, crashing chrome
		paths: ['./node_modules', './client/app']
	}).bundle()
		.pipe(plumber())
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadmaps: true}))
		.pipe(gulp.dest('client/build/js'));
}


gulp.task('develop', function(dev) {

	var forceRestart = function(err) {
		if(err) {
			server.kill('SIGTERM', startServer);
		}
	}

	var startServer = server.listen({
		path: './server/server.js',
		env: {NODE_ENV: 'local'},
	}, forceRestart);

	gulp.watch(['client/app/**'], function() {
		console.log('rebuild client.')
		build_browserify();
		copy_assets();
		startServer();
	});

	gulp.watch(['server/**/*.js'], startServer);
	gulp.watch(['server/**/*.jade'], startServer);
	gulp.watch('Gulpfile.js', startServer);

});


