var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
	return sass(['css/main.scss'], { sourcemap: true})
    .pipe(sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: 'css'
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function(){
	gulp.watch('css/**/*.scss', ['sass']);
});

gulp.task('default',['sass', 'watch']);

livereload = require('livereload');
server = livereload.createServer();
server.watch(__dirname);
console.log('livereload start');
