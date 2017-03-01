module.exports = (gulp, plugins) => {
	gulp.task('maps', callback => plugins.runSequence([
		'maps-browserify',
		'maps-browserSync',
		'maps-watch',
	], callback));

	gulp.task('maps-browserify', () =>
		gulp
			.src('src/maps/templates/**/index.js')
			.pipe(plugins.browserify({
				insertGlobals: true,
			}))
			.on('error', plugins.util.log)
			.pipe(gulp.dest('src/maps/dist'))
			.pipe(plugins.browserSync.stream())
	);

	gulp.task('maps-browserSync', () => {
		plugins.browserSync.init({
			server: {
				baseDir: './src/maps',
			},
			notify: false,
			open: false,
		});
	});

	gulp.task('maps-watch', () => {
		gulp.watch('src/maps/globals/**/*.js', ['maps-browserify']);
		gulp.watch('src/maps/templates/**/*.js', ['maps-browserify']);
		gulp.watch('src/maps/**/*').on('change', plugins.browserSync.reload);
	});
};
