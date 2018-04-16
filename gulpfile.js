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

const                 del = require('del');
const                http = require('http');

/**
 * As a developer, I should be able to run the gulp scripts command at the command line to concatenate, minify, and copy all of the project’s JavaScript files into an all.min.js file that is then copied to the dist/scripts folder.
 */

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * concat-js
gulp.task('concat-js', function() {
    return gulp.src(["./jquery-3.3.1.min.js", "./js/circle/autogrow.js", "./js/circle/circle.js", "global.js"])
        .pipe( maps.init() )
        .pipe( concat("all.js") )
        .pipe( maps.write() )
        .pipe( gulp.dest("./js") )
        ;
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * minify-js
gulp.task('minify-js',['concat-js'], function() {
    return gulp.src("./js/all.js")
        .pipe( uglify() )
        .pipe( rename("all.min.js") )
        .pipe( gulp.dest("./dist/scripts") )
        ;
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * move-js-map
gulp.task('move-js-map',['concat-js'], function() {
    return gulp.src("./js/all.js.map")
        .pipe( rename("all.min.js.map") )
        .pipe( gulp.dest("./dist/scripts") )
        ;
})
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * move-sass-map
gulp.task('move-sass-map', function() {
    return gulp.src("./sass/*.map")
        .pipe( rename("all.min.css.map") )
        .pipe( gulp.dest("./dist/styles/") )
})

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * html
gulp.task('html',['compile-sass'], function () {
    return gulp.src('./index.html')
        .pipe( useref() )
        .pipe( gulpif('*.js', uglify()) )
        .pipe( gulpif('*.css', minifycss()) )
        .pipe( gulp.dest('dist') );
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * scripts
gulp.task('scripts', ['minify-js', 'move-js-map'], function() {
    return console.log('scripts havec been concatenated and minified in folder dist/scripts')
});

/**
 * As a developer, I should be able to run the gulp styles command at the command line to compile the project’s SCSS files into CSS, then concatenate and minify into an all.min.css file that is then copied to the dist/styles folder.
 */

// compile sass and minify css
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * compile-sass

gulp.task('compile-sass', function() {
    return gulp.src("./sass/global.scss")
        .pipe( maps.init() )
        .pipe( sass() )
        .pipe( minifycss() )
        .pipe( rename("global.css"))
        .pipe( maps.write("./") )
        .pipe( gulp.dest("./sass") )
})
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * styles
gulp.task('styles',['compile-sass'], function() {
    return gulp.src("./sass/global.css*")
        .pipe( gulp.dest("./dist/styles") )
        ;
});

/**
 * As a developer, I should be able to run the gulp images command at the command line to optimize the size of the project’s JPEG and PNG files, and then copy those optimized images to the dist/content folder.
 */

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * images
gulp.task('images', function() {
    return gulp.src("./images/*.{jpg,png}")
        .pipe( smushit() )
        .pipe( gulp.dest("./dist/images"))
});

/**
 * As a developer, I should be able to run the gulp clean command at the command line to delete all of the files and folders in the dist folder.
 */

 // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * clean
gulp.task('clean', function() {
    return del(["./dist", "./js/all.js*", "./sass/*.css*", "./js/all.js*"]);
})

/**
 * As a developer, I should be able to run the gulp build command at the command line to run the clean, scripts, styles, and images tasks with confidence that the clean task completes before the other commands.
 */

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * build
gulp.task('build', ['clean'], function() {
    gulp.start(['html', 'images']);
    return gulp.start(['move-sass-map', 'move-js-map']);
});

/**
 * As a developer, I should be able to run the gulp command at the command line to run the build task and serve my project using a local web server.
 */

/**
 * As a developer, when I run the default gulp command, it should continuously watch for changes to any .scss file in my project. When there is a change to one of the .scss files, the gulp styles command is run and the files are compiled, concatenated, and minified to the dist folder. My project should then reload in the browser, displaying the changes.
 */

 // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * default
gulp.task('default',['build', 'watch-sass'], function() {
    gulp.src("./dist")
        .pipe(
            webserver({
                livereload: true,
                open: true
            })
        )
        ;
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * watch-sass
gulp.task('watch-sass', function() {
    gulp.watch("sass/**/*.s*ss", ['styles']);
})

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * serve
gulp.task('serve', function() {
    gulp.src("./dist")
        .pipe(
            webserver({
                livereload: true,
                open: true
            })
        )
        ;
})

