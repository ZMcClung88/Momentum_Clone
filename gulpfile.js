var gulp = require('gulp')
,   concat = require('gulp-concat')
,   sass = require('gulp-sass')
,   annotate = require('gulp-ng-annotate')
,   sourcemaps = require('gulp-sourcemaps')
,   CacheBuster = require('gulp-cachebust')
,   uglify = require('gulp-uglify')
,   rename = require('gulp-rename')
,   cssmin = require('gulp-cssmin')
,   htmlmin = require('gulp-htmlmin')
,   print = require('gulp-print')
,   babel = require('gulp-babel');

var cachebust = new CacheBuster();

var paths = {
    jsSource: ['./frontend/js/**/*.js'],
    sassSource: ['./frontend/styles/*.scss'],
    indexSource: ['./index.html'],
    viewsSource: ['./frontend/views/*.html'],
    picturesSource: ['./frontend/img/**/*']
};

gulp.task('sass', function() {
    return gulp.src(paths.sassSource)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cachebust.resources())
    .pipe(concat('bundle.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(rename({extname: ".min.css"}))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
    return gulp.src(paths.jsSource)
        .pipe(sourcemaps.init())
        .pipe(print())
        .pipe(babel({presets: ['es2015'] }))
        .pipe(concat('bundle.js'))
        .pipe(annotate())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(rename({extname: ".min.js"}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('views', function() {
    gulp.src(paths.viewsSource)
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest("./dist/views"));
});

gulp.task('index', function() {
    gulp.src(paths.indexSource)
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest("./dist"));
});

gulp.task('img', function() {
    gulp.src(paths.picturesSource)
      .pipe(gulp.dest("./dist/img"));
});

gulp.task('watch', function() {
    gulp.watch(paths.jsSource, ['js']);
    gulp.watch(paths.sassSource, ['sass']);
    gulp.watch(paths.indexSource, ['index']);
    gulp.watch(paths.viewsSource, ['views']);
    gulp.watch(paths.picturesSource, ['img']);
});

gulp.task('default', ['js', 'sass', 'index', 'views', 'img',
    'watch'
]);
