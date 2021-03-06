var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var karmaServer = require('karma').Server;
var del = require('del');

gulp.task('clean', function () {
  return del([
    'webapp/dist'
  ]);
});

var paths = {
  html: './webapp/src/**/*.html',
  js: './webapp/src/app/**/*.js',
  sass: './webapp/src/sass/**/*.scss'
};

gulp.task('copy-html', function(){
  gulp.src(paths.html)
    .pipe(gulp.dest('webapp/dist'));
});

gulp.task('bundle-js', function(){
  browserify('./webapp/src/app/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./webapp/dist'));
});

gulp.task('bundle-css', function(){
  gulp.src('./webapp/src/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./webapp/dist'));
})

gulp.task('watch', ['default'], function(){
  gulp.watch(paths.html,['copy-html']);
  gulp.watch(paths.js,['bundle-js']);
  gulp.watch(paths.sass,['bundle-css']);
});

gulp.task('test', ['default'], function(){
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }).start();
});

gulp.task('default', ['copy-html', 'bundle-js', 'bundle-css']);
