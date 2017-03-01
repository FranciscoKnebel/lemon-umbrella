// Watch
module.exports = function watch(gulp, plugins) {
	const series = plugins.runSequence;

	function watchTargets() {
		gulp.watch('src/sass/**/*.scss', ['minify-sass']);
		gulp.watch('src/js/**/*.js', ['minify-js']);
		gulp.watch('src/maps/globals/**/*.js', ['browserify']);
		gulp.watch('src/maps/templates/**/*.js', ['browserify']);
		gulp.watch('src/maps/**/*').on('change', plugins.browserSync.reload);
	}

	gulp.task('watch', () => {
		series('browserSync', watchTargets);
	});

	gulp.task('observe', () => {
		watchTargets();
	});
};
