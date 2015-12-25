// general plugins
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sequence = require('run-sequence');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

// style plugins
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');

// script plugins
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// Task `styles`
// compiles stylesheet and optimises file 
gulp.task('styles', function() {
  return gulp.src('./style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({ browsers: ['last 2 version'] })
    ]))
    .pipe(sourcemaps.write('../assets'))
    .pipe(gulp.dest('../assets'));
});
 
// Task `scripts`
// compiles app script and optimises files 
gulp.task('scripts-compile', scripts(false));
gulp.task('scripts-develop', scripts(true));

function scripts(watch) {
  return function(done) {
    var bundler = browserify({ 
      entries: './main.jsx',
      debug: true,
      extensions: ['.js', '.jsx'],
      cache: {},
      packageCache: {}
    });

    bundler.transform(babelify, { presets: ['es2015', 'react'] });
    
    if (watch) {
      done();
      bundler.plugin(watchify);
      bundler.on('update', rebundle);
    }

    function rebundle() {
      gutil.log(watch ? '-> Rebundling' : '-> Bundling');
      
      return bundler.bundle()
        .on('error', function() { this.emit('end'); })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('../assets'))
        .pipe(gulp.dest('../assets'))
        .on('end', function() { 
          gutil.log('-> Bundling complete');
          if (!watch) done();
        });
    }

    rebundle();
  };
}
 
// Task `watch`
// run various tasks on file changes
gulp.task('watch', function () {
  gulp.watch('../components/**/*.scss', ['styles']);
  gulp.watch('**/*.scss', ['styles']);
});
 
// Task `compile`
// Deletes dist folder and builds site from scratch
gulp.task('compile', function(done) {
  sequence(['styles', 'scripts-compile'], done);
});
 
// Task `develop`
// Runs `compile` task then watches for file changes
gulp.task('develop', function(done) {
  sequence('styles', 'scripts-develop', 'watch', done);
});
 
gulp.task('default', ['develop']);