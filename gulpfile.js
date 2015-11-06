var gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    mocha   = require('gulp-mocha');

function updateVersion(importance) {
  return gulp.src('./package.json')
    .pipe(plugins.bump({ type: importance }))
    .pipe(gulp.dest('./'));
}

gulp.task('patch',   function() { return updateVersion('patch'); });
gulp.task('feature', function() { return updateVersion('minor'); });
gulp.task('release', function() { return updateVersion('major'); });

gulp.task('test', function () {
  return gulp.src('test/init-spec.js')
             .pipe(mocha());
});

gulp.task('coverage', function () {
  return gulp.src('test/init-spec.js')
             .pipe(mocha({
                reporter: 'html-cov',
                require: ['blanket']
              }));
});

gulp.task('js', function () {
  var pkg = require('./package.json');

  gulp.src("./knockout-pre-rendered.js")
      .pipe(plugins.replace('{{ version }}', pkg.version))
      .pipe(gulp.dest('./dist'))
      .pipe(plugins.uglify())
      .pipe(plugins.rename('knockout-pre-rendered.min.js'))
      .pipe(gulp.dest('./dist'));

  gulp.src('./knockout-pre-rendered.d.ts')
      .pipe(gulp.dest('./dist'));

  gulp.src('./knockout.d.ts')
      .pipe(gulp.dest('./dist'));
});

gulp.task('ci', ['js', 'test']);
gulp.task('default', ['js']);