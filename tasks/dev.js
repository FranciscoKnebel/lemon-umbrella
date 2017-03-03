module.exports = (gulp, plugins) => {
	const series = plugins.runSequence;

	gulp.task('dev-clean', () => gulp.src('dist/*', { read: false }).pipe(plugins.clean()));

	gulp.task('dev-browserify', () => {
		const bundler = plugins.browserify({
			entries: ['dist/scripts/main.js'],
			debug: true,
		});

		return bundler.bundle()
			.on('error', (err) => { console.error(err); })
			.pipe(plugins.browserify_source('app.js'))
			.pipe(plugins.browserify_buffer())
			.pipe(plugins.sourcemaps.init({ loadMaps: true }))
			.pipe(plugins.uglify())
			.pipe(plugins.optimizeJs())
			.on('error', plugins.util.log)
			.pipe(plugins.sourcemaps.write('./sourcemaps'))
			.pipe(gulp.dest('./dist/scripts'))
			.pipe(plugins.browserSync.stream());
	});

	gulp.task('dev-browserSync', () => {
		plugins.browserSync.init({
			server: {
				baseDir: './dist',
			},
			notify: false,
			open: false,
		});
	});

	gulp.task('dev-getMaps', () =>
		gulp
			.src('src/game/maps/**/*.{png,json}')
			.pipe(plugins.rename({ dirname: '' }))
			.pipe(gulp.dest('dist/maps'))
			.pipe(plugins.browserSync.stream())
	);

	gulp.task('dev-getPages', () =>
		gulp
			.src('src/game/**/*.html')
			.pipe(plugins.rename({ dirname: '' }))
			.pipe(gulp.dest('dist'))
			.pipe(plugins.browserSync.stream())
	);

	gulp.task('dev-getSprites', () =>
		gulp
			.src('src/game/sprites/**/*.png')
			.pipe(gulp.dest('dist/sprites'))
			.pipe(plugins.browserSync.stream())
	);

	gulp.task('dev-copyFiles', () => series('dev-getMaps', 'dev-getPages', 'dev-getSprites'));

	gulp.task('dev-watch', (cb) => {
		gulp.watch('src/sass/**/*.scss', ['minify-sass']);
		gulp.watch('src/game/scripts/**/*.js', () => series('minify-js', 'dev-browserify'));
		gulp.watch('src/game/maps/**/*.{png,json}', series('dev-getMaps', 'dev-browserify'));
		gulp.watch('src/game/**/*.html', ['dev-getPages']);
		gulp.watch('src/game/sprites/**/*.png', series('dev-getSprites', 'dev-browserify'));
		gulp.watch('src/maps/templates/**/*.json', () => series('maps-config', 'dev-getMaps', 'dev-browserify'));

		cb();
	});

	gulp.task('dev', (callback) => {
		series('dev-clean', ['minify', 'dev-copyFiles'], 'dev-browserify', 'dev-browserSync', 'dev-watch', callback);
	});
};
