'use strict';

 
const gulp      = require('gulp');
const rename    = require('gulp-rename');
const concat    = require('gulp-concat');
const uglify    = require('gulp-uglify');
const sass      = require('gulp-sass');
const minifycss = require('gulp-clean-css');
const maps      = require('gulp-sourcemaps');
const smushit   = require('gulp-smushit');

const del       = require('del');
 

// npm install

// concatenate, minify, and copy js files

// Compile SCSS

// source maps

// optimized images

// clean files

// prioritize tasks

// build task / local web server




/**
 * As a developer, I should be able to run the gulp scripts command at the command line to concatenate, minify, and copy all of the project’s JavaScript files into an all.min.js file that is then copied to the dist/scripts folder.
 */

// concatenation task
gulp.task('concat-js', function() {
    return gulp.src(["./js/circle/autogrow.js", "circle.js", "global.js"])
        .pipe( maps.init() )
        .pipe( concat("all.js") )
        .pipe( maps.write("./") )
        .pipe( gulp.dest("./js") )
        ;
});
// minify task (depends on concatenation)
gulp.task('minify-js',['concat-js'], function() {
    return gulp.src("./js/all.js")
        .pipe( uglify() )
        .pipe( rename("all.min.js") )
        .pipe( gulp.dest("./dist/scripts") )
        ;
});
// move the map in dist folder
gulp.task('move-js-maps',['concat-js'], function() {
    return gulp.src("./js/all.js.map")
        .pipe( rename("all.min.js.map") )
        .pipe( gulp.dest("./dist/scripts") )
        ;
})

// scripts task
gulp.task('scripts', ['minify-js', 'move-js-maps'], function() {
    return console.log('scripts havec been concatenated and minified in folder dist/scripts')
});

/**
 * As a developer, I should be able to run the gulp styles command at the command line to compile the project’s SCSS files into CSS, then concatenate and minify into an all.min.css file that is then copied to the dist/styles folder.
 */

// compile sass and minify css
gulp.task('styles', function() {
    return gulp.src("./sass/global.scss")
        .pipe( maps.init() )
        .pipe( sass() )
        .pipe( minifycss() )
        .pipe( rename("all.min.css"))
        .pipe( maps.write("./") )
        .pipe( gulp.dest("./dist/styles") )
        ;
});

/**
 * As a developer, I should be able to run the gulp images command at the command line to optimize the size of the project’s JPEG and PNG files, and then copy those optimized images to the dist/content folder.
 */

gulp.task('images', function() {
    return gulp.src("./images/*.{jpg,png}")
        .pipe( smushit() )
        .pipe( gulp.dest("./dist/content"))
});

/**
 * As a developer, I should be able to run the gulp clean command at the command line to delete all of the files and folders in the dist folder.
 */

gulp.task('clean', function() {
    return del(["./dist", "./js/all.js*"]);
})

/**
 * As a developer, I should be able to run the gulp build command at the command line to run the clean, scripts, styles, and images tasks with confidence that the clean task completes before the other commands.
 */


gulp.task('prebuild',['clean']);

gulp.task('build', ['prebuild', 'scripts', 'styles', 'images']);

// this should be the build task 
gulp.task('default',['build'], function() {


    console.log('\n\nProject built!\n\n')
});


/**
 * As a developer, I should be able to run the gulp command at the command line to run the build task and serve my project using a local web server.
 */






/**
 * As a developer, when I run the default gulp command, it should continuously watch for changes to any .scss file in my project. When there is a change to one of the .scss files, the gulp styles command is run and the files are compiled, concatenated, and minified to the dist folder. My project should then reload in the browser, displaying the changes.
 */


