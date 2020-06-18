const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;


// Minify html files
function mHtml() {
  return gulp
  .src('*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
}
gulp.task(mHtml);

// CSS TO Clean CSS
function mCss() {
  return gulp
    .src('*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build'));
}
gulp.task(mCss);

// Minify JS files
function mJs() {
  return gulp
    .src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
}
gulp.task(mJs);

function watch() {
  gulp.watch('*.html', mHtml);
  gulp.watch('*.css', mCss);
  gulp.watch('js/*.js', mJs);
}
gulp.task(watch)
// Build deployment folder
gulp.task('build', gulp.series(mHtml, mCss, mJs));