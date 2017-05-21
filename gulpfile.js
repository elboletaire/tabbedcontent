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
    .pipe(gulp.dest('dist/demos'))
})

gulp.task('demos:assets', () => {
  return gulp.src([
    './node_modules/jquery/dist/jquery.js',
    './node_modules/zepto/src/zepto.js',
    './node_modules/zepto/src/event.js',
    './node_modules/zepto/src/data.js',
    './src/demos/analytics.js',
  ])
  .pipe(uglify())
  .pipe(rename({
    extname: '.min.js',
  }))
  .pipe(chmod(0o664))
  .pipe(gulp.dest('dist/demos/assets'))
})

gulp.task('demos:html', () => {
  return gulp.src('src/demos/*.html')
    .pipe(replace(/\.\.\/\.\.\/node_modules\/(?:jquery|zepto)\/(?:dist|src)\/(\w+)\.js/g, './assets/$1.min.js'))
    .pipe(replace('../tabbedcontent.', './tabbedcontent.min.'))
    .pipe(replace('./analytics.', './assets/analytics.min.'))
    .pipe(replace('./demo.', './demo.min.'))
    .pipe(replace('./bootstrap.', './bootstrap.min.'))
    .pipe(gulp.dest('dist/demos'))
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
    .pipe(gulp.dest('dist/demos'))
    .pipe(gulp.dest('dist'))
})

gulp.task('clean', () => {
  return gulp
    .src(['dist/*'], { read: false })
    .pipe(clean())
})

gulp.task('assets', ['assets:js'], () => {
  return gulp.src('src/index.html')
    .pipe(replace('./tabbedcontent', './tabbedcontent.min'))
    .pipe(chmod(0o664))
    .pipe(gulp.dest('dist'))
})

gulp.task('demos', ['demos:css', 'demos:html', 'demos:assets'])
gulp.task('default', ['assets', 'demos'])
