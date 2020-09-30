// Plugins
const gulp          = require('gulp'),
      sassVariables = require('gulp-sass-variables'),
      sass          = require('gulp-sass'),
      postcss       = require('gulp-postcss'),
      autoprefixer  = require('autoprefixer'),
      cssnano       = require('cssnano'),
      rename        = require('gulp-rename');

      sass.compiler = require('node-sass');

// Define Folders
const paths = {
    src : 'src/**/*.scss',
    dist: 'dist/',
};

/**
 * Compile styles from SCSS to CSS in
 */
function buildShortVersion() {
    return gulp.src(paths.src)
        .pipe(sassVariables({
            $naming: 'short'
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest(paths.dist))
        .pipe(rename({ suffix: '.min' }))
        .pipe(postcss([ cssnano() ]))
        .pipe(gulp.dest(paths.dist));
}

/**
 * Compile styles from SCSS to CSS in
 */
function buildFullVersion() {
    return gulp.src(paths.src)
        .pipe(sassVariables({
            $naming: 'full'
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(rename({ suffix: '-full' }))
        .pipe(gulp.dest(paths.dist))
        .pipe(rename({ suffix: '.min' }))
        .pipe(postcss([ cssnano() ]))
        .pipe(gulp.dest(paths.dist));
}

/**
 * Define tasks
 */
gulp.task('buildShortVersion', buildShortVersion);
gulp.task('buildFullVersion', buildFullVersion);

/**
 * Build CSS files
 */
function build() {
    return gulp.series('buildShortVersion', 'buildFullVersion');
}

/**
 * Default watch function
 */
function watch() {
    gulp.watch(paths.src, buildShortVersion);
    gulp.watch(paths.src, buildFullVersion);
}

/**
 * Exports
 */
exports.watch = watch;
exports.build = build;
exports.default = build;
