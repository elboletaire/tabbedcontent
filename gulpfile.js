const gulp = require('gulp'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      cleanCss = require('gulp-clean-css'),
      chmod = require('gulp-chmod'),
      clean = require('gulp-clean'),
      replace = require('gulp-replace')

gulp.task('demos:css', () => {
  return gulp.src('src/demos/*.css')
    .pipe(cleanCss())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(chmod(0o664))
    .pipe(gulp.dest('./dist'))
})

gulp.task('assets:js', () => {
  return gulp.src('src/tabbedcontent.js')
    .pipe(uglify({
      preserveComments: 'license'
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(chmod(0o664))
    .pipe(gulp.dest('./dist'))
})

gulp.task('clean', () => {
  return gulp.src('dist/*', { read: false })
    .pipe(clean())
})

gulp.task('assets', ['assets:css', 'assets:js'], () => {
  return gulp.src('src/index.html')
    .pipe(replace('./tabbedcontent', './tabbedcontent.min'))
    .pipe(chmod(0o664))
    .pipe(gulp.dest('./dist'))
})
gulp.task('default', ['assets'])
