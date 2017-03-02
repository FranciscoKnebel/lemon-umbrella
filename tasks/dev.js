module.exports = (gulp, plugins) => {
	const series = plugins.runSequence;

	gulp.task('dev-clean', () => gulp.src('src/game/dist/**/*.*', { read: false }).pipe(plugins.clean()));

	gulp.task('dev-browserify', () => {
		const bundler = plugins.browserify({
			entries: ['src/game/dist/scripts/main.js'],
			debug: true,
		});

		return bundler.bundle()
			.on('error', (err) => { console.error(err); this.emit('end'); })
			.pipe(plugins.browserify_source('app.js'))
			.pipe(plugins.browserify_buffer())
			.pipe(plugins.sourcemaps.init({ loadMaps: true }))
			.pipe(plugins.uglify())
			.pipe(plugins.optimizeJs())
			.on('error', plugins.util.log)
			.pipe(plugins.sourcemaps.write('./sourcemaps'))
			.pipe(gulp.dest('./src/game/dist/scripts'))
			.pipe(plugins.browserSync.stream());
	});

	gulp.task('dev-browserSync', () => {
		plugins.browserSync.init({
			server: {
				baseDir: './src/game',
			},
			notify: false,
			open: false,
		});
	});

	gulp.task('dev-watch', () => {
		gulp.watch('src/sass/**/*.scss', ['minify-sass']);
		gulp.watch('src/game/scripts/**/*.js', () => series('minify-js', 'dev-browserify'));
	});

	gulp.task('dev', (callback) => {
		series('dev-clean', 'minify', 'dev-browserify', 'dev-browserSync', 'dev-watch', callback);
	});
};
