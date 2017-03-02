module.exports = (gulp, plugins) => {
	gulp.task('maps', callback => plugins.runSequence([
		'maps-browserify',
		'maps-browserSync',
		'maps-watch',
	], callback));

	gulp.task('maps-browserify', () => {
		const b = plugins.browserify({
			entries: ['src/maps/templates/1/index.js'],
			debug: true,
		});

		return b.bundle()
			.pipe(plugins.browserify_source('index.js'))
			.pipe(plugins.browserify_buffer())
			.pipe(gulp.dest('src/maps/dist/1'))
			.pipe(plugins.browserSync.stream());
	});

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
