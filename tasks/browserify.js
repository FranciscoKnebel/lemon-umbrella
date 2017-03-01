module.exports = (gulp, plugins) => {
	gulp.task('browserify', () =>
		gulp
			.pipe(plugins.plumber())
			.src('src/maps/templates/**/index.js')
			.pipe(plugins.browserify({
				insertGlobals: true,
			}))
			.pipe(gulp.dest('src/maps/dist'))
			.pipe(plugins.browserSync.stream())
	);
};
