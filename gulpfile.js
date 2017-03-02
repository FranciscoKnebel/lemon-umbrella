const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

plugins.runSequence = require('run-sequence');
plugins.browserSync = require('browser-sync');
plugins.browserify = require('browserify');
plugins.browserify_source = require('vinyl-source-stream');
plugins.browserify_buffer = require('vinyl-buffer');

gulp.task('default', callback => plugins.runSequence('build', callback));

require('./tasks/clean')(gulp, plugins);
require('./tasks/build')(gulp, plugins);
require('./tasks/minify')(gulp, plugins);
require('./tasks/maps')(gulp, plugins);
require('./tasks/update')(gulp, plugins);
require('./tasks/watch')(gulp, plugins);

require('./tasks/dev')(gulp, plugins);
