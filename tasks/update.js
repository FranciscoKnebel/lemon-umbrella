module.exports = function update(gulp, plugins) {
	gulp.task('browserSync-reload', () =>	plugins.browserSync.reload());
};
