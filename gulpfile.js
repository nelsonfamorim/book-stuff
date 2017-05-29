const gulp = require('gulp');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const mocha = require('gulp-mocha');

gulp.task('compile-styles', () => {
    gulp.src(["public/assets/css/*.scss"])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/assets/css'));
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
        .pipe(gulp.dest('public/assets/lib/'));
});

gulp.task('bundle-scripts', () => {
    gulp.src(["public/app/app.js", "public/app/components/**/*.js"])
        .pipe(concat('core.js'))
        .pipe(gulp.dest('public/assets/js/'));
});

gulp.task('copy-fonts', ()=>{
    gulp.src(["bower_components/bootstrap-sass/assets/fonts/**/*"])
    .pipe(gulp.dest('public/assets/fonts'))
})

gulp.task('bundle', ['bundle-libs', 'bundle-scripts']);

gulp.task('test',  ()=>{
    gulp.src(['test/*.spec.js'], {read: false})
		.pipe(mocha({reporter: 'spec'}))
});

gulp.task('build', ['bundle', 'compile-styles', 'copy-fonts','test']);

gulp.task('watch', ()=>{
    gulp.watch(["public/app/app.js", "public/app/components/**/*.js"], ['bundle-scripts']);
    gulp.watch('public/assets/css/*.scss', ['compile-styles']);
});