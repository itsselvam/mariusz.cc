var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var neat = require('node-neat').includePaths;

var srcDir = './source';
var dstDir = './.tmp';
var bowerDir = './components/';

var sassDir = srcDir + '/stylesheets/site.scss';
var sassIncludeDir = [
  bowerDir + '/modular-scale/stylesheets',
  bowerDir + '/flickity/dist',
  srcDir + '/stylesheets'
];
var sassOutDir = dstDir + '/stylesheets';

var imagesDir = srcDir + '/images';
var imagesOutDir = dstDir + '/images';

var jsDir = srcDir + '/javascripts';
var jsOutDir = dstDir + '/javascripts';

var fontsDir = srcDir + '/fonts';
var fontsOutDir = dstDir + '/fonts';

gulp.task('sass', function() {
  return gulp.src(sassDir)
    .pipe(sass({
      includePaths: sassIncludeDir.concat(neat),
      style: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(sassOutDir));
});

gulp.task('images', function() {
  return gulp.src(imagesDir + '/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(imagesOutDir));
});

gulp.task('fonts', function() {
  return gulp.src(fontsDir + '/**/*')
    .pipe(gulp.dest(fontsOutDir));
});

gulp.task('javascripts', function() {
  return gulp.src([
      bowerDir + '/jquery/dist/jquery.js',
      bowerDir + '/jribbble/dist/jribbble.js',
      bowerDir + '/flickity/dist/flickity.pkgd.js',
      jsDir + '/site.js'
    ])
    .pipe(concat('site.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsOutDir))
});

gulp.task('watch', function() {
  gulp.start('sass', 'images', 'fonts', 'javascripts');
  gulp.watch(sassDir + '/**/*', ['sass']);
  gulp.watch(jsDir + '/**/*', ['javascripts']);
  gulp.watch(imagesDir + '/**/*', ['images']);
  gulp.watch(fontsDir + '/**/*', ['fonts']);
  gulp.watch('Gulpfile.js', ['sass', 'javascripts', 'images', 'fonts']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['sass', 'images', 'javascripts', 'fonts']);