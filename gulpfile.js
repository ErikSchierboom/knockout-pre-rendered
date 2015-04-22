var gulp = require('gulp'),
    yaml = require('js-yaml'),
    fs = require('fs'),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    config = yaml.safeLoad(fs.readFileSync('./config.yaml', 'utf8')),
    plugins = require('gulp-load-plugins')();

function updateVersion(importance) {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(plugins.bump({type: importance}))
    .pipe(gulp.dest('./'));
}

gulp.task('patch', function() { return updateVersion('patch'); });
gulp.task('feature', function() { return updateVersion('minor'); });;
gulp.task('release', function() { return updateVersion('major'); })

gulp.task('webserver', function () {
  return gulp.src('.')
    .pipe(plugins.webserver(config.webserver));
});

gulp.task('test', function () {
    return gulp
    .src('test/runner.html')
    .pipe(mochaPhantomJS());
});

gulp.task('js', function () {
  gulp.src("./index.js")
    .pipe(plugins.header(config.header,
        { pkg: require('./package.json'), now: new Date() }))
    .pipe(plugins.footer(config.footer))
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