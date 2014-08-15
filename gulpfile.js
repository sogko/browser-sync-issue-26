var gulp      = require('gulp'),
  browserSync = require('browser-sync'),
  reload      = browserSync.reload,
  sass = require('gulp-sass'),
  path = require('path'),
  minifyCSS = require('gulp-minify-css'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require("gulp-rename");

var config = {
  // 1. inform browser-sync to watch compiled *.css files instead of *.scss sass files
  files: "web-app/css/**/*.css",
  proxy: "localhost:3000"
};

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
    .pipe(gulp.dest('web-app/css/'));

  // 2. you don't need these anymore, since browser-sync will be
  // triggered once the sass compilation task writes to web-app/css/ folder
  // .pipe(filter('web-app/css/**/*.css'))
  // .pipe(reload({stream:true}));
});

// Default task to be run with `gulp`
gulp.task('default', ['sass','browser-sync'], function () {
  gulp.watch("web-app/css/**/*.scss", ['sass']);
});