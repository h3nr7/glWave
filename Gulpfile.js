var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var server = require('gulp-develop-server');
var babelify = require('babelify');
var sass = require('gulp-sass');
var jeet = require('jeet');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var del = require('del');

var paths = {
	app_js: './client/app/main.js',
	styles: [
		'./client/app/styles/*.scss',
		'./client/app/styles/_*.scss',
		'./client/app/components/**/*.scss',
		'./client/app/components/**/_*.scss'
	],
	assets: './client/assets',
	client: './client'
};

gulp.task('assets', copy_assets);
function copy_assets() {
	return gulp.src(paths.assets + '/**')
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('client/build/assets'));
}

/**
 * build style
 */
gulp.task('build:sass', build_sass);
function build_sass() {
	return gulp.src(paths.styles)
		.pipe(sass())
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('client/build/stylesheet'));
};

/**
 * browserify build js
 * @type {[type]}
 */
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


/**
 * run when developing
 */
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
		build_sass();
		build_browserify();
		copy_assets();
		startServer();
	});


	gulp.watch(['server/**/*.js'], startServer);
	gulp.watch(['server/**/*.jade'], startServer);
	gulp.watch('Gulpfile.js', startServer);

});


