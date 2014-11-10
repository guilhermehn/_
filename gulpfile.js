var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var files = ['index.js', 'fundash.js', 'tests/*.js'];

gulp.task('default', function () {
  return gulp.src(files)
    .pipe(plugins.jscs())
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function () {
  gulp.start('default');

  gulp.watch(files, ['default']);
});
