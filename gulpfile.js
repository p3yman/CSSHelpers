// Plugins
var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    cssmin          = require('gulp-cssmin'),
    rename          = require('gulp-rename'),
    rimraf          = require('gulp-rimraf'),
    csscomb         = require('gulp-csscomb');

// Define Folders
var source_dir      = 'src/**/*.scss',
    dest_dir        = 'dest/';

//-------------------------------
// Tasks
//-------------------------------

// Clean all files in destination folder
gulp.task('clean', function() {
    return gulp.src(dest_dir + '*', { read: false })
        .pipe(rimraf({ force: true }));
});

// Styles
gulp.task('styles', function() {
    return gulp.src( source_dir )
        .pipe( sass().on('error', sass.logError) )
        .pipe( autoprefixer("last 5 version") )
        .pipe( gulp.dest( dest_dir ) )
        .pipe( rename({suffix: '.min'}) )
        .pipe( cssmin() )
        .pipe( gulp.dest( dest_dir ) );
});

// Default and Watch
gulp.task('default', ['styles'], function() {

    gulp.watch( source_dir , ['styles'] );

});