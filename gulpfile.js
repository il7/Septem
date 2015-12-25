// general plugins
var gulp = require('gulp');
var sequence = require('run-sequence');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

// style plugins
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');

// script plugins
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

 
// Task `empty`
// empties the dist folder before each startup
gulp.task('empty', function(done) {
  del('dist/**/*', done)
});
 
// Task `styles`
// compiles stylesheet and optimises file 
gulp.task('styles', function() {
  return gulp.src('source/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({ browsers: ['last 2 version'] })
    ]))
    .pipe(gulp.dest('dist/assets'));
});
 
// Task `scripts`
// compiles app script and optimises files 
gulp.task('scripts', function() {
  var b = browserify({ 
    entries: './source/scripts/main.jsx',
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
    .pipe(gulp.dest('./dist/assets'));
});
 
// Task `copy-images`
// minimizes and copies images
gulp.task('copy-images', function() {
  return gulp.src('source/images/**/*')
    .pipe(gulp.dest('dist/assets/images'));
});

// Task `copy-svg`
// copies svg folder to dist
gulp.task('copy-svg', function() {
  return gulp.src('source/svg/**/*')
    .pipe(gulp.dest('dist/assets/svg'));
});
 
// Task `copy-fonts`
// copies fonts folder to dist
gulp.task('copy-fonts', function() {
  return gulp.src('source/fonts/**/*')
    .pipe(gulp.dest('dist/assets/fonts'));
});

// Task `copy-pages`
// copies pages folder to dist
gulp.task('copy-pages', function() {
  return gulp.src('source/index.html')
    .pipe(gulp.dest('dist/'));
});

 
// Task `watch`
// run various tasks on file changes
gulp.task('watch', function () {
  gulp.watch('source/styles/**/*', ['styles']);
  gulp.watch('source/scripts/**/*', ['scripts']);
  gulp.watch('components/**/*', ['scripts']);
  gulp.watch('source/images/**/*', ['copy-images']);
  gulp.watch('source/svg/**/*', ['copy-svg']);
  gulp.watch('source/pages/**/*', ['copy-pages']);
});

// Task `copy`
// copies assets
gulp.task('copy', ['copy-images', 'copy-fonts', 'copy-pages', 'copy-svg']);
 
// Task `compile`
// Deletes dist folder and builds site from scratch
gulp.task('compile', function(done) {
  sequence('empty', ['styles', 'scripts', 'copy'], done);
});
 
// Task `develop`
// Runs `compile` task then watches for file changes
gulp.task('develop', function(done) {
  sequence('compile', 'watch', done);
});
 
gulp.task('default', ['develop']);