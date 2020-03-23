// Plugins
const gulp          = require('gulp'),
      sass          = require('gulp-sass'),
      postcss       = require('gulp-postcss'),
      autoprefixer  = require('autoprefixer'),
      cssnano       = require('cssnano'),
      rename        = require('gulp-rename');

// Define Folders
const paths = {
    src : 'src/**/*.scss',
    dist: 'dist/',
};

/**
 * Compile styles from SCSS to CSS
 */
function build() {
    return gulp.src(paths.src)
        .pipe(sass())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest(paths.dist))
        .pipe(rename({ suffix: '.min' }))
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(gulp.dest(paths.dist));
}

/**
 * Default watch file
 */
function watch() {
    gulp.watch(paths.src, build);
}

/**
 * Set default
 */
gulp.task('default', build);

/**
 * Exports
 */
exports.watch = watch;
exports.build = build;
