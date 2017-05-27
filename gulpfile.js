const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('bundle-libs', ()=>{
    gulp.src(["bower_components/angular/angular.min.js"])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('client/assets/lib/'));
});

gulp.task('bundle-scripts', ()=>{
    gulp.src(["client/app/app.js"])
    .pipe(concat('core.js'))
    .pipe(gulp.dest('client/assets/js/'));
});

gulp.task('bundle', ['bundle-libs', 'bundle-scripts']);