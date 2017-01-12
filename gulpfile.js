'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const rename = require('gulp-rename');

gulp.task('js', () => {
  return gulp.src([
    'node_modules/@console/bluemix-components/consumables/js/es5/bluemix-components.min.js',
    'node_modules/svgxuse/svgxuse.min.js',
  ])
  .pipe(gulp.dest('./app/dist/js'));
});

gulp.task('fonts', () => {
  return gulp.src('node_modules/@console/bluemix-components/consumables/assets/fonts/*.{woff2,woff}')
    .pipe(gulp.dest('app/fonts'))
    .pipe(gulp.dest('app/dist/fonts'))
});

gulp.task('html', () => {
  return gulp.src([
    'app/index.html'
  ])
  .pipe(gulp.dest('./app/dist'));
});

gulp.task('styles', () => {
  return gulp.src('app/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/@console'],
    }))
    .pipe(prefix({
      browsers: ['> 1%', 'last 2 versions'],
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('nodemon', () => {
  let started = false;
  
  const stream = nodemon({
    script: './app/bin/www',
    watch: './app',
  })
  .on('start', () => {
    if (!started) {
      started = true;
      cb();
    } else {
      browserSync.reload({ stream: false });
    }
  });
  
  return stream;
});

gulp.task('watch', () => {
  gulp.watch('./app/scss/*.scss', ['styles', reload]);
  gulp.watch('./app/*.html', ['html', reload]);
});

gulp.task('build', ['fonts', 'html', 'styles', 'js']);

gulp.task('dev', ['build', 'watch', 'nodemon'], () => {
  browserSync.init({
    proxy: 'http://localhost:7777',
    open: false
  });
});