const gulp = require('gulp');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
const sass = require('gulp-sass');

gulp.task('compile-styles', () => {
    gulp.src(["client/assets/css/*.scss"])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('client/assets/css'));
});

gulp.task('bundle-libs', () => {
    gulp.src([
        "bower_components/angular/angular.min.js",
        "bower_components/angular-ui-router/release/angular-ui-router.min.js",
        "bower_components/lodash/dist/lodash.min.js",
        "bower_components/angular-toastr/dist/angular-toastr.tpls.min.js",
        "bower_components/sockjs/sockjs.min.js",
        "bower_components/ng-sockjs/dist/ng-sockjs.min.js"
    ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('client/assets/lib/'));
});

gulp.task('bundle-scripts', () => {
    gulp.src(["client/app/app.js", "client/app/components/**/*.js"])
        .pipe(concat('core.js'))
        .pipe(gulp.dest('client/assets/js/'));
});

gulp.task('copy-fonts', ()=>{
    gulp.src(["bower_components/bootstrap-sass/assets/fonts/**/*"])
    .pipe(gulp.dest('client/assets/fonts'))
})

gulp.task('bundle', ['bundle-libs', 'bundle-scripts']);

gulp.task('build', ['bundle', 'compile-styles', 'copy-fonts']);

gulp.task('watch', ()=>{
    gulp.watch(["client/app/app.js", "client/app/components/**/*.js"], ['bundle-scripts']);
    gulp.watch('client/assets/css/*.scss', ['compile-styles']);
});