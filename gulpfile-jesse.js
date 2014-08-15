var gulp        = require('gulp'),
  browserSync = require('browser-sync'),
  reload      = browserSync.reload,
  sass = require('gulp-sass'),
  path = require('path'),
  minifyCSS = require('gulp-minify-css'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require("gulp-rename");

var config = {
  proxy: "localhost:3000"
}

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
  browserSync(config)
});

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers

gulp.task('sass', function () {
  return gulp.src('web-app/css/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    .pipe(minifyCSS({keepSpecialComments:0}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('web-app/css/'))
    .pipe(reload({stream:true}));
});

// Default task to be run with `gulp`
gulp.task('default', ['sass','browser-sync'], function () {
  gulp.watch("web-app/css/**/*.scss", ['sass']);
});