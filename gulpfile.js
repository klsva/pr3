'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const jade = require('gulp-jade');
var pug = require('gulp-pug');
const notify = require('gulp-notify');
var googlecdn = require('gulp-google-cdn');
var clean = require('gulp-clean');

var bower = require('main-bower-files');
var bowerNormalizer = require('gulp-bower-normalize');

var mainBowerFiles = require('gulp-main-bower-files');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpFilter = require('gulp-filter');

var paths = {
  scss:['./scss/main.scss'],
  jade:['./*.jade']
};

//очистка в билде
gulp.task('clean', function(done) {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
    done();
});

//очистка bower libs
gulp.task('cleanBW', function(done) {
    return gulp.src('./libs', {read: false})
        .pipe(clean());
    done();
});

//дергает библиотеки
/*
gulp.task('bowercomp', function() {
    return gulp.src(bower(), {base: './bower_components'})
        .pipe(bowerNormalizer({bowerJson: './bower.json'}))
        .pipe(gulp.dest('./libs/'))
});
*/
// Fonts
gulp.task('fonts', function() {
    return gulp.src([
                    '../bower_components/font-awesome/fonts/fontawesome-webfont.*'])
            .pipe(gulp.dest('dist/fonts/'));
});

//сборка html
/*gulp.task('jade', function(done){
    gulp.src('index.jade')
    .on('data', function(file){
        console.log({
            relative: file.relative,
            contents: file.contents            
        });
    })
    .pipe(jade())
    .pipe(gulp.dest('./dist'));
    done();        
});
*/

 
gulp.task('views', function buildHTML(done) {
    return gulp.src('./views/*.pug')
    .on('data', function(file){
      //console.log({ relative: file.relative, contents: file.contents });
    })
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('./dist'));
    done();
});

//сборка css
gulp.task('scss', function(done) {
  return gulp.src('./scss/main.scss')
    .pipe(sass({
        outputStyle: 'expanded'
  }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
    done();
});

//сборка проекта
gulp.task('build', gulp.parallel('views','scss', 'fonts', function(done){
    done();
}));

gulp.task('build:watch',function(){
    gulp.watch(paths.jade,gulp.series('jade'));
    gulp.watch(paths.scss,gulp.series('scss'));
    
});