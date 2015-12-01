var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename')
;

gulp.task('default', function() {
    return gulp.src('tabbedcontent.js')
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('.'))
    ;
});
