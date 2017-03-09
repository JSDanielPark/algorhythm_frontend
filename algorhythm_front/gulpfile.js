var gulp = require('gulp');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');


gulp.task('default', function() {
	process.env.NODE_ENV = 'development';
	return browserify('./source/app.js')
		.transform(babelify)
		.bundle()
		.pipe(source('algorhythm.js'))
		.pipe(gulp.dest('./build/'));
});

gulp.task('release', function() {
	process.env.NODE_ENV = 'production';
	return browserify('./source/app.js')
		.transform(babelify)
		.bundle()
		.pipe(source('algorhythm.min.js'))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest('./build/'));
});
