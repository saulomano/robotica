'use strict';

import fs from 'fs';
import runSequence from 'run-sequence';

export default (gulp, plugins, config) => {

	gulp.task('bump:build', (cb) => {
		gulp.src('./*.json')
			.pipe(plugins.bump())
			.pipe(gulp.dest('./'))
			.on('end', cb);
	});

	gulp.task('bump:inject', (cb) => {
		gulp.src('./dist/client/index.html')
			.pipe(plugins.injectVersion())
			.pipe(gulp.dest('./dist/client/'))
			.on('end', cb);
	});

	gulp.task('bump', ['bump:build', 'bump:inject']);
}