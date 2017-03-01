module.exports = function build(gulp, plugins) {
	gulp.task('build', callback => plugins.runSequence('clean', 'minify', 'browserify', callback));
};
