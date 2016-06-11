/**
 * Created by jdunk on 07/06/2016.
 */
var Config = require('./gulpfile.config');
var config = new Config();

var gulp = require("gulp");
var del = require('del');
var tsc = require("gulp-typescript");
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');
var watch = require('gulp-watch');

var tsProject = tsc.createProject("tsconfig.json");

gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript)
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

gulp.task('clean', function () {
    var typeScriptGenFiles = [
        config.tsOutputPath +'/**/*.js',    // path to all JS files auto gen'd by editor
        config.tsOutputPath +'/**/*.js.map' // path to all sourcemap files auto gen'd by editor
    ];

    // delete the files
    return del(typeScriptGenFiles);
});

gulp.task('compile-ts', ['clean'], function () {
    var sourceTsFiles = [
        config.allTypeScript,                 //path to typescript files
        config.libraryTypeScriptDefinitions]; //reference to library .d.ts files

    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    tsResult.dts
        .pipe(gulp.dest(config.tsOutputPath));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.tsOutputPath));
});

gulp.task('clean-dist', function() {
    return  del(['./dist/**/*.*']);
});

gulp.task('copy-html', function() {
    gulp.src('./*.{csv,html}')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('pack', ['copy-html', 'compile-ts'], function() {
    return gulp.src(config.allJavaScript)
        .pipe(webpack({output: {filename: 'app.js'}}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['clean-dist'], function() {
    gulp.watch(config.allTypeScript, ['pack']);
    gulp.watch('./*.{csv,html}', ['copy-html']);
});

gulp.task('default', ['ts-lint', 'pack']);