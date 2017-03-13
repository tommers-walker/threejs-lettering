var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var rename = require("gulp-rename");
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var del = require('del');
var flatten = require('gulp-flatten');

gulp.task("delete-dist", function() {
  return gulp.src("dist");
})

gulp.task("copy-cname", function() {
  return gulp.src("CNAME")
    .pipe(gulp.dest("dist"))
})

gulp.task("copy-gifs", function() {
  return gulp.src("images/*.gif")
    .pipe(gulp.dest("dist/images"))
})

gulp.task('minify-images', function() {
  return gulp.src(['images/*', "!images/*.gif"])
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('minify-my-js', function () {
  return gulp.src(['js/**/*.js', "!js/**/*.min.js"])
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-vendor-js', function () {
  return gulp.src("js/**/*.min.js")
    .pipe(gulp.dest('dist/js'));
});

gulp.task('concat-all-js', function() {
  return gulp.src("dist/js/**/*.min.js")
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('prefix-my-css', function() {
  return gulp.src('css/app.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions']
  }))
  .pipe(gulp.dest('css'))
});

gulp.task('minify-all-css', function() {
  return gulp.src(['css/**/*.css', '!css/**/*.min.css'])
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('concat-all-css', function() {
  return gulp.src("dist/css/**/*.min.css")
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('copy-favicons', function() {
  return gulp.src('favicons/*')
    .pipe(gulp.dest('dist/favicons'));
});

gulp.task('copy-fonts', function() {
  return gulp.src('fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean:dist', function () {
  return del([
    'dist/js/**/*',
    'dist/css/**/*',
    // we don't want to clean this file though so we negate the pattern
    '!dist/js/app.min.js',
    '!dist/css/app.min.css'
  ]);
});

gulp.task('htmlreplace', function() {
  return gulp.src('index.html')
  .pipe(htmlreplace({
    js: 'js/app.min.js',
    css: "css/app.min.css"
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(plumber(function(error) {
        console.log(error);
        this.emit('end');
    }))
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('css'))
});

gulp.task('connect', function() {
  connect.server();
});

gulp.task('watch', function() {
  return gulp.watch('scss/**/*.scss', ['sass']);
  // Other watchers
});

gulp.task("build", function() {
  runSequence("delete-dist", "copy-gifs", "minify-images", "minify-my-js", "copy-vendor-js", "concat-all-js", "prefix-my-css", 'minify-all-css', "concat-all-css", "copy-fonts", "copy-favicons", "clean:dist", "htmlreplace", "copy-cname");
});

gulp.task('clear-cache', function (done) {
  return cache.clearAll(done);
});

gulp.task("default", ["connect", "watch"]);
