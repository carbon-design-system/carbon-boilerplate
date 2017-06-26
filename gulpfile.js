'use strict'; // eslint-disable-line

const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

const reload = browserSync.reload;

gulp.task('copyJS', () =>
  gulp
    .src(['node_modules/carbon-components/scripts/carbon-components.min.js'])
    .pipe(gulp.dest('dist/js'))
);

gulp.task('copyHTML', () => gulp.src('app/views/home.html').pipe(gulp.dest('dist')));

gulp.task('js', () =>
  gulp
    .src('app/js/*.js')
    .pipe(
      babel({
        presets: ['es2015', 'stage-1'],
      })
    )
    .pipe(gulp.dest('dist/js'))
);

gulp.task('fonts', () =>
  gulp
    .src('node_modules/carbon-components/src/globals/fonts/*.{woff2,woff}')
    .pipe(gulp.dest('app/assets/fonts'))
    .pipe(gulp.dest('dist/assets/fonts'))
);

gulp.task('img', () => gulp.src('app/assets/img/**.*').pipe(gulp.dest('dist/assets/img')));

gulp.task('styles', () =>
  gulp
    .src('app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compressed',
        includePaths: ['node_modules'],
      })
    )
    .pipe(
      prefix({
        browsers: ['> 1%', 'last 2 versions'],
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
);

gulp.task('nodemon', () => {
  let started = false;

  const stream = nodemon({
    script: './app/bin/www',
    watch: './app',
  }).on('start', () => {
    if (!started) {
      started = true;
    } else {
      browserSync.reload({ stream: false });
    }
  });

  return stream;
});

gulp.task('watch', () => {
  gulp.watch('./app/scss/**/*.scss', ['styles', reload]);
  gulp.watch('./app/js/*.js', ['js', reload]);
  gulp.watch('./app/views/**/*.html', ['copyHTML', reload]);
});

gulp.task('build', ['fonts', 'img', 'styles', 'copyJS', 'copyHTML', 'js']);

gulp.task('dev', ['build', 'watch', 'nodemon'], () => {
  browserSync.init({
    proxy: 'http://localhost:7777',
    open: false,
  });
});
