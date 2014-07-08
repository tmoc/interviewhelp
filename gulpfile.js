var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


var paths = {
  scripts: ['static/jquery.js', 'static/easyrtc.js', 'static/app.js'],
  stylesheets: ['static/*.css']
};

gulp.task('build', function () {
  return gulp.src(paths.scripts) 
    .pipe(uglify())
    .pipe(concat('built.min.js'))
    .pipe(gulp.dest('static'));
});