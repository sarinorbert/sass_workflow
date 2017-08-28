const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require("gulp-rename");

//Compile Sass
gulp.task('sass',function(){
	return gulp.src(['src/sass/*.sass'])
						.pipe(sass().on('error', sass.logError))
						.pipe(gulp.dest('src/css'))
						.pipe(browserSync.stream());
});

//Minify
gulp.task('minify',function(){
	return gulp.src(['src/sass/*.sass'])
						.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
						.pipe(rename("style.min.css"))
						.pipe(gulp.dest('src/css'))
						.pipe(browserSync.stream());
});



//Watch & Serve
gulp.task('serve', ['sass'], function(){
	browserSync.init({
		server: './src'
	});

	gulp.watch(['src/sass/*.sass'], ['sass']);
	gulp.watch(['src/*.html']).on('change',browserSync.reload);
});

//Defsult tasks
gulp.task('default', ['serve']);