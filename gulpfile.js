'use strict';

/**
 * Import node modules
 */
var gulp         = require('gulp');
var rename       = require('gulp-rename');
var zip          = require('gulp-zip');
var uglify       = require('gulp-uglify');
var rollup       = require('gulp-rollup');
var nodeResolve  = require('rollup-plugin-node-resolve');
var commonjs     = require('rollup-plugin-commonjs');
var babel        = require('rollup-plugin-babel');
var browserSync  = require('browser-sync');

var dir = {
  src: 'src',
  dist: 'dist'
};

/**
 * Build javascript
 */
gulp.task('js', function() {
  return gulp.src(dir.src + '/**/*.js')
    .pipe(rollup({
      allowRealFiles: true,
      entry: dir.src + '/jquery.smoothscroll.js',
      format: 'iife',
      external: ['jquery'],
      globals: {
        jquery: "jQuery"
      },
      plugins: [
        nodeResolve({ jsnext: true }),
        commonjs(),
        babel({
          presets: ['es2015-rollup'],
          babelrc: false
        })
      ]
    }))
    .pipe(gulp.dest(dir.dist))
    .on('end', function() {
      gulp.src([dir.dist + '/jquery.smoothscroll.js'])
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dir.dist));
    });
});

/**
 * Sample page
 */
gulp.task('html', function() {
  return gulp.src(dir.src + '/*.html')
    .pipe(gulp.dest(dir.dist));
});

/**
 * Auto Build
 */
gulp.task('watch', function() {
  gulp.watch([dir.src + '/**/*.js'], ['js']);
  gulp.watch([dir.src + '/**/*.html'], ['html']);
});

/**
 * Build
 */
gulp.task('build', ['html', 'js']);

/**
 * Browsersync
 */
gulp.task('server',['build'], function() {
  browserSync.init( {
    server: {
      baseDir: dir.dist + '/'
    },
    files: [
      dir.dist + '/**'
    ]
  });
});

gulp.task('default', ['watch', 'server']);
