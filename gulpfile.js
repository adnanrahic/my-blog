var gulp = require('gulp');
var inject = require('gulp-inject');
var del = require('del');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var bytediff = require('gulp-bytediff');
var cleanCSS = require('gulp-clean-css');
var htmlclean = require('gulp-htmlclean');

var paths = {
	index: 'app/index.html',
	app: 'app',
	appInit: [
		'app/app.module.js',
		'app/app.factory.js'
		],
	appConfig: [
		'app/app.run.js',
		'app/app.config.js'
		],
	auth: [
		'app/auth/auth.factory.js'
	],
	home: [
		'app/home/home.routes.js',
		'app/home/home.factory.js',
		'app/home/**/*.js'
		],
	about: [
		'app/about/about.routes.js',
		'app/about/**/*.js'
		],
	contact: [
		'app/contact/contact.routes.js',
		'app/contact/**/*.js'
		],
	story: [
		'app/story/story.routes.js',
		'app/story/story.factory.js',
		'app/story/**/*.js'
		],
  dash: [
		'app/dash/dash.routes.js',
		'app/dash/dash.factory.js',
		'app/dash/**/*.js'
		],
  templates: ['app/**/*.html', '!app/index.html'],
	assets: 'app/assets/**/*',
	favicon: 'app/favicon.ico',
  dist: 'dist',
	distAssets: 'dist/assets'
}

paths.appSrc = paths.appInit
       .concat(paths.auth)
       .concat(paths.about)
       .concat(paths.contact)
       .concat(paths.story)
       .concat(paths.dash)
       .concat(paths.home)
       .concat(paths.appConfig);


/**
 * inject dev files
 */
gulp.task('dev', function() {
	var assets = gulp.src(paths.assets);
	var templates = gulp.src(paths.templates);
	var favicon = gulp.src(paths.favicon);

	var appSrc = gulp.src(paths.appSrc);

	return gulp.src(paths.index)
				.pipe(inject(assets, {
					relative:true,
					empty:true
				}))
				.pipe(inject(appSrc, {
					relative:true,
					empty:true
				}))
				.pipe(gulp.dest(paths.app));
	
});

/**
 * concat & minify app files
 */
gulp.task('build', function () {

	var favicon = gulp.src(paths.favicon).pipe(gulp.dest(paths.dist));
	var distAssets = gulp.src(paths.assets).pipe(gulp.dest(paths.distAssets));
	var distTemplates = gulp.src(paths.templates).pipe(htmlclean()).pipe(gulp.dest(paths.dist));

  var dist = gulp.src(paths.appSrc)
		.pipe(sourcemaps.init())
		.pipe(concat('app.min.js'))
		.pipe(ngAnnotate())
		.pipe(bytediff.start())
		.pipe(uglify({
				mangle: true
		}))
		.pipe(bytediff.stop())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.dist));

  
  // need the index from the dist directory!!!!
  return gulp.src(paths.index)
		.pipe(htmlclean())
		.pipe(gulp.dest(paths.dist))
		.pipe(inject(distAssets, {
				relative: true,
				empty: true,
				name: 'assetsInject'
		}))
		.pipe(inject(dist, {
				relative: true,
				empty: true
		}))
		.pipe(gulp.dest(paths.dist));

});

/**
 * clean tasks
 */
gulp.task('clean', function () {
  del([paths.dist]);
});