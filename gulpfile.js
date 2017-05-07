const gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	babel = require('gulp-babel'),
	autoprefixer = require('gulp-autoprefixer'),
	pug = require('gulp-pug');

const jsSources = ['assets/js/scripts/*.js'],
	sassSources = ['assets/sass/app.sass'],
	cssSources = ['assets/css/stylesheets/*.css'],
	htmlSources = ['views/main/index.html'],
	pugSources = ['views/main/pug/*.pug'];

gulp.task('log', function() {
	gutil.log('hello world')
});

gulp.task('html', function() {
	gulp.src(htmlSources)
	.pipe(connect.reload())
});

gulp.task('pug', function() {
	gulp.src(pugSources)
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest('views/main'))
	.pipe(connect.reload())
});

gulp.task('sass', function() {
	gulp.src(sassSources)
	.pipe(sass({outputStyle: 'extended'}))
	.on('error', gutil.log)
	.pipe(autoprefixer({browsers: ['last 4 versions'], cascade: false}))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(rename('app.min.css'))
	.pipe(gulp.dest('assets/css'))
	.pipe(connect.reload())
});

gulp.task('js', function() {
	gulp.src(jsSources)
	.pipe(babel({presets: ['es2015']}))
	.pipe(uglify())
	.pipe(concat('script.min.js'))
	.pipe(gulp.dest('assets/js'))
	.pipe(connect.reload())
});

gulp.task('watch', function() {
	gulp.watch(htmlSources, ['html']);
	gulp.watch(pugSources, ['pug']);
	gulp.watch('views/main/pug/partials/*.pug', ['pug']);
	gulp.watch('views/main/pug/partials/**/*.pug', ['pug']);
	gulp.watch(sassSources, ['sass']);
	gulp.watch('assets/sass/**/*.sass', ['sass']);
	gulp.watch(jsSources, ['js']);
});

gulp.task('connect', function() {
	connect.server({
		root: '.',
		livereload: true
	})
});

gulp.task('default', ['html', 'pug', 'sass', 'js', 'connect', 'watch']);