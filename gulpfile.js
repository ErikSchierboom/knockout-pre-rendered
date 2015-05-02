var gulp    = require('gulp'),
    yaml    = require('js-yaml'),
    fs      = require('fs'),
    config  = yaml.safeLoad(fs.readFileSync('./config.yaml', 'utf8')),
    plugins = require('gulp-load-plugins')(),
    replace = require('gulp-replace'),
    mochaPhantomJS = require('gulp-mocha-phantomjs');

function updateVersion(importance) {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(plugins.bump({ type: importance }))
    .pipe(gulp.dest('./'));
}

gulp.task('patch',   function() { return updateVersion('patch'); });
gulp.task('feature', function() { return updateVersion('minor'); });
gulp.task('release', function() { return updateVersion('major'); });

gulp.task('webserver', function () {
  return gulp.src('.')
    .pipe(plugins.webserver(config.webserver));
});

gulp.task('test', function () {
  return gulp
    .src('spec/runner.html')
    .pipe(mochaPhantomJS());
});

gulp.task('js', function () {
  var pkg = require('./package.json');

  gulp.src("./index.js")
    .pipe(plugins.header(config.header, { pkg: pkg, now: new Date() }))
    .pipe(plugins.footer(config.footer))
    .pipe(replace('{{ version }}', pkg.version))
    .pipe(plugins.rename('knockout-pre-rendered.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename('knockout-pre-rendered.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['js'], function () {
  gulp.watch(config.watch, ['js']);
});

gulp.task('live', ['watch', 'webserver']);
gulp.task('ci', ['js', 'test']);
gulp.task('default', ['live']);