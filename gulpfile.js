var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');

gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(plumber(function(error) {
        console.log(error);
        this.emit('end');
    }))
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('css'))
});

gulp.task('watch', function() {
  return gulp.watch('scss/**/*.scss', ['sass']);
  // Other watchers
});

gulp.task("default", ["watch"]);
