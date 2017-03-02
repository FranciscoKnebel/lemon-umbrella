module.exports = function minify(gulp, plugins) {
	gulp.task('minify', callback => plugins.runSequence([
		'minify-sass', 'minify-js',
	], callback));

	gulp.task('minify-sass', () =>
		gulp.src('src/sass/*.scss')
				.pipe(plugins.plumber())
				.pipe(plugins.sassGlob())
				.pipe(plugins.sass())
				.on('error', plugins.util.log)
				.pipe(plugins.autoprefixer({ browsers: ['last 10 versions'], cascade: false }))
				.on('error', plugins.util.log)
				.pipe(plugins.jsbeautifier())
				.on('error', plugins.util.log)
				// .pipe(gulp.dest('src/game/dist'))
				.pipe(plugins.cssmin())
				.on('error', plugins.util.log)
				/* .pipe(plugins.rename({
					suffix: '.min',
				})) */
				.pipe(gulp.dest('src/game/dist'))
				.pipe(plugins.browserSync.stream())
	);

	gulp.task('minify-js', () =>
		gulp.src('src/game/scripts/**/*.js')
				.pipe(plugins.plumber())
				.pipe(plugins.babel({
					presets: ['es2015'],
				}))
				.pipe(gulp.dest('src/game/dist/scripts'))
				/* .pipe(plugins.uglify())
				.pipe(plugins.optimizeJs())
				.pipe(plugins.rename({
					suffix: '.min',
				}))
				.pipe(gulp.dest('docs'))
				.pipe(gulp.dest('dist'))
				.pipe(plugins.gzip())
				.pipe(gulp.dest('dist'))*/
				.on('error', plugins.util.log)
				.pipe(plugins.browserSync.stream())
	);
};
