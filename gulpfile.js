// general plugins
var gulp = require('gulp');
var sequence = require('run-sequence');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

// style plugins
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');

// script plugins
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
 
// Task `styles`
// compiles stylesheet and optimises file 
gulp.task('styles', function() {
  return gulp.src('./assets/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({ browsers: ['last 2 version'] })
    ]))
    .pipe(gulp.dest('assets'));
});
 
// Task `scripts`
// compiles app script and optimises files 
gulp.task('scripts', function() {
  var b = browserify({ 
    entries: './assets/scripts/main.jsx',
    debug: true,
    extensions: ['.js', '.jsx']
  });
 
  b.transform(babelify, { presets: ['es2015', 'react'] });
  b.bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets'));
});
 
// Task `watch`
// run various tasks on file changes
gulp.task('watch', function () {
  gulp.watch('assets/styles/**/*', ['styles']);
  gulp.watch('assets/scripts/**/*', ['scripts']);
  gulp.watch('components/**/*', ['scripts']);
});
 
// Task `compile`
// Deletes dist folder and builds site from scratch
gulp.task('compile', function(done) {
  sequence(['styles', 'scripts'], done);
});
 
// Task `develop`
// Runs `compile` task then watches for file changes
gulp.task('develop', function(done) {
  sequence('compile', 'watch', done);
});
 
gulp.task('default', ['develop']);