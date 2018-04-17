'use strict';

const                gulp = require('gulp');
const              rename = require('gulp-rename');
const              concat = require('gulp-concat');
const              uglify = require('gulp-uglify');
const                sass = require('gulp-sass');
const           minifycss = require('gulp-clean-css');
const                maps = require('gulp-sourcemaps');
const             smushit = require('gulp-smushit');
const           webserver = require('gulp-webserver');
const              useref = require('gulp-useref');
const              gulpif = require('gulp-if');
const             replace = require('gulp-replace');

const                 del = require('del');
const                http = require('http');
const            lazypipe = require('lazypipe');

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * scripts
gulp.task('scripts', function() {
    return gulp.src(["./js/jquery-3.3.1.min.js", "./js/circle/autogrow.js", "./js/circle/circle.js", "./js/global.js"])
        .pipe( maps.init() )
        .pipe( concat("all.js") )
        .pipe( gulp.dest("./js"))
        .pipe( uglify() )
        .pipe( rename("all.min.js") )
        .pipe( maps.write("./") )
        .pipe( gulp.dest("./dist/scripts") )
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * styles
gulp.task('styles', function() {
    return gulp.src("./sass/global.scss")
        .pipe( maps.init() )
        .pipe( sass() )
        .pipe( rename("global.css") )
        .pipe( gulp.dest("./sass") )
        .pipe( minifycss() )
        .pipe( rename("all.min.css") )
        .pipe( maps.write("./") )
        .pipe( gulp.dest("./dist/styles") )
});

gulp.task('pre-useref-sass', ['clean'], function() {
    return gulp.src("./sass/global.scss")
        .pipe( sass() )
        .pipe( rename("global.css") )
        .pipe( gulp.dest("./sass"))
})

gulp.task('pre-useref-js', function() {
    return gulp.src(["./js/jquery-3.3.1.min.js", "./js/circle/autogrow.js", "./js/circle/circle.js", "./js/global.js"])
        .pipe( concat("all.js") )
        .pipe( gulp.dest("./js"))
})

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * useref
gulp.task('useref',['pre-useref-sass', 'pre-useref-js' ], function () {
    return gulp.src('./index.html')
        .pipe( useref({}, lazypipe().pipe(maps.init, { loadMaps: true })) )
        .pipe( maps.write("./") )
        .pipe( replace('images/', 'content/'))
        .pipe( gulpif('*.js', uglify()) )
        .pipe( gulpif('*.css', minifycss()) )
        .pipe( gulp.dest('dist') );
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * images
gulp.task('images', function() {
    return gulp.src("./images/*.{jpg,png}")
        .pipe( smushit() )
        .pipe( gulp.dest("./dist/content"))
});

 // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * clean
gulp.task('clean', function() {
    return del(["./dist", "./js/all.js*", "./sass/*.css*", "./js/all.js*"]);
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * build
gulp.task('build', ['clean', 'useref', 'images'], function() {
    return console.log('\nbuild done!\n');
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * default
gulp.task('default',['build', 'watch-sass'], function() {
    return gulp.src("./dist")
        .pipe(
            webserver({
                livereload: true,
                open: true
            })
        )
        ;
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * watch-sass
gulp.task('watch-sass', ['build'], function() {
    return gulp.watch("sass/**/*.s*ss", ['styles']);
});