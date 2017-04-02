'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const jade = require('gulp-jade');
const notify = require('gulp-notify');
var googlecdn = require('gulp-google-cdn');
var clean = require('gulp-clean');

var paths = {
  scss:['./scss/main.scss'],
  jade:['./*.jade']
};

gulp.task('jade', function(done){
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

gulp.task('clean', function(done) {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
    done();
});

gulp.task('scss', function(done) {
  return gulp.src('./scss/main.scss')
    .pipe(sass({
        outputStyle: 'expanded'
  }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
    done();
}));

gulp.task('build', gulp.parallel('jade','scss',function(done){
    done();
}));

gulp.task('build:watch',function(){
    gulp.watch(paths.jade,gulp.series('jade'));
    gulp.watch(paths.scss,gulp.series('scss'));
    
});