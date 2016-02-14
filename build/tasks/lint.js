var gulp = require('gulp');
var paths = require('../paths');
var eslint = require('gulp-eslint');
var remark = require('gulp-remark');

gulp.task('lint', function() {
  return gulp.src(paths.source)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('md-lint', function() {
  gulp.src(['*.md', paths.doc + '/*.md', '!' + paths.doc + '/CHANGELOG.md'])
    .pipe(remark());
});
