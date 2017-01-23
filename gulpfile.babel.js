'use strict';

const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const watchify = require('watchify');
const rename = require('gulp-rename');
const gutil = require('gulp-util');
const server = require('gulp-server-livereload');

const config = {
    src: {
        js: './src/js/app.js',
        html: './src/*.html',
        css: './src/css/**/*.css'
    },
    dest: './dist/'
};

let bundle = (bundler) => {
    bundler
        .bundle()
        .pipe(source('bundled-app.js'))
        .pipe(buffer())
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest(config.dest))
        .on('end', () => gutil.log(gutil.colors.green('==> Successful Bundle!')));
};

gulp.task('js', () => {
    let bundler = browserify(config.src.js, {debug: true})
        .plugin(watchify)
        .transform(babelify, {presets: ['es2015']});

    bundle(bundler);

    bundler.on('update', () => bundle(bundler));
});

gulp.task('html', () => {
    gulp.src(config.src.html)
        .pipe(gulp.dest(config.dest));
});

gulp.task('css', () => {
    gulp.src(config.src.css)
        .pipe(gulp.dest(config.dest));
});

gulp.task('webserver', () => {
    gulp.src(config.dest)
        .pipe(server({
            livereload: {
                enable: true,
                port: 35730
            },
            port: 8002,
            clientLog: 'error',
            open: true,
            defaultFile: 'index.html'
        }));
});

gulp.task('default', () => {
   gulp.start('js', 'html', 'css', 'webserver');
   gulp.watch('./src/**/*.js', ['js']);
   gulp.watch(config.src.html, ['html']);
   gulp.watch(config.src.css, ['css']);
});
