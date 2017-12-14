var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    server = require('browser-sync'),
    sass = require('gulp-sass'),
    minify = require('gulp-csso'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin');

gulp.task('styles', function() {
  gulp.src('sass/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
  .pipe(gulp.dest('css'))
  .pipe(minify())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('css'))
  .pipe(server.reload({stream: true}));
});

gulp.task('serve', function(){
  server.init({
    server: {
      baseDir: './'
    },
    notify: false
  });
});

gulp.task('images', function() {
  return gulp.src('img/*')
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest('img-min'));
});

gulp.task ('watch', ['serve', 'styles'], function() {
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch('*.html', server.reload);
  gulp.watch('js/*.js', server.reload);
});